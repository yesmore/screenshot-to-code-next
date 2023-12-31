"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import ImageUpload from "./layouts/ImageUpload";
import CodePreview from "./layouts/CodePreview";
import Preview from "./layouts/Preview";
import { CodeGenerationParams, generateCode } from "./generateCode";
import Spinner from "./layouts/Spinner";
import classNames from "classnames";
import {
  FaCode,
  FaDesktop,
  FaDownload,
  FaMobile,
  FaUndo,
  FaCloudUploadAlt,
} from "react-icons/fa";

import { Switch } from "./shared/switch";
import { Button } from "./shared/button";
import { Textarea } from "./shared/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shared/tabs";
import SettingsDialog from "./layouts/SettingsDialog";
import { Settings, EditorTheme, AppState, GeneratedCodeConfig } from "./types";
import { usePersistedState } from "../lib/hooks/usePersistedState";
import html2canvas from "html2canvas";
import CodeTab from "./layouts/CodeTab";
import OutputSettingsSection from "./layouts/OutputSettingsSection";
import { History } from "./history/history_types";
import HistoryDisplay from "./history/HistoryDisplay";
import { extractHistoryTree } from "./history/utils";
import toast from "react-hot-toast";
import PromptPanel from "./layouts/PromptPanel";

import NativePreview from "./layouts/NativeMobile";
import Header from "./layouts/Header";

import dynamic from "next/dynamic";
import DemoVide from "./layouts/DemoVideo";
import AccessCode from "./layouts/AccessCode";
import { useTranslation } from "react-i18next";

const Whiteboard = dynamic(async () => await import("./layouts/Whiteboard"), {
  ssr: false,
});

const IS_OPENAI_DOWN = false;

function App({ Config }: { Config?: FunctionComponent }) {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [generatedCode, setGeneratedCode] = useState<string>("");

  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [executionConsole, setExecutionConsole] = useState<string[]>([]);
  const [updateInstruction, setUpdateInstruction] = useState("");
  const [showImageUpload, setShowImageUpload] = useState<boolean>(true);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const { t } = useTranslation("draw");

  // Settings
  const [settings, setSettings] = usePersistedState<Settings>(
    {
      openAiApiKey: null,
      openAiBaseURL: null,
      screenshotOneApiKey: null,
      isImageGenerationEnabled: true,
      editorTheme: EditorTheme.COBALT,
      generatedCodeConfig: GeneratedCodeConfig.HTML_TAILWIND,
      // Only relevant for hosted version
      isTermOfServiceAccepted: false,
      accessCode: null,
      mockAiResponse: false,
      promptCode: "",
      init: false,
      llm: "OpenAi",
      geminiApiKey: null,
    },
    "setting"
  );

  // App history
  const [appHistory, setAppHistory] = useState<History>([]);
  // Tracks the currently shown version from app history
  const [currentVersion, setCurrentVersion] = useState<number | null>(null);

  const [shouldIncludeResultImage, setShouldIncludeResultImage] =
    useState<boolean>(false);

  const wsRef = useRef<AbortController>(null);

  // When the user already has the settings in local storage, newly added keys
  // do not get added to the settings so if it's falsy, we populate it with the default
  // value
  useEffect(() => {
    if (!settings.generatedCodeConfig) {
      setSettings((prev) => ({
        ...prev,
        generatedCodeConfig: GeneratedCodeConfig.HTML_TAILWIND,
      }));
    }
  }, [settings.generatedCodeConfig, setSettings]);

  const takeScreenshot = async (): Promise<string> => {
    const iframeElement = document.querySelector(
      "#preview-desktop"
    ) as HTMLIFrameElement;
    if (!iframeElement?.contentWindow?.document.body) {
      return "";
    }

    const canvas = await html2canvas(iframeElement.contentWindow.document.body);
    const png = canvas.toDataURL("image/png");
    return png;
  };

  const downloadCode = () => {
    // Create a blob from the generated code
    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and set properties for download
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html"; // Set the file name for download
    document.body.appendChild(a); // Append to the document
    a.click(); // Programmatically click the anchor to trigger download

    // Clean up by removing the anchor and revoking the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setAppState(AppState.INITIAL);
    setGeneratedCode("");
    setReferenceImages([]);
    setExecutionConsole([]);
    setAppHistory([]);
  };

  const stop = () => {
    if (wsRef.current && !wsRef.current.signal.aborted) {
      wsRef.current.abort();
    } // make sure stop can correct the state even if the websocket is already closed
    setAppState(AppState.CODE_READY);
  };

  function doGenerateCode(
    params: CodeGenerationParams,
    parentVersion: number | null
  ) {
    setExecutionConsole([]);
    setAppState(AppState.CODING);

    // Merge settings with params
    const updatedParams = { ...params, ...settings };

    generateCode(
      wsRef,
      updatedParams,
      (token) => setGeneratedCode((prev) => prev + token),
      (code) => {
        setGeneratedCode(code);
        if (params.generationType === "create") {
          setAppHistory([
            {
              type: "ai_create",
              parentIndex: null,
              code,
              inputs: { image_url: referenceImages[0] },
            },
          ]);
          setCurrentVersion(0);
        } else {
          setAppHistory((prev) => {
            // Validate parent version
            if (parentVersion === null) {
              toast.error(
                "No parent version set. Contact support or open a Github issue."
              );
              return prev;
            }

            const newHistory: History = [
              ...prev,
              {
                type: "ai_edit",
                parentIndex: parentVersion,
                code,
                inputs: {
                  prompt: updateInstruction,
                },
              },
            ];
            setCurrentVersion(newHistory.length - 1);
            return newHistory;
          });
        }
      },
      (line) => setExecutionConsole((prev) => [...prev, line]),
      () => {
        setAppState(AppState.CODE_READY);
      }
    );
  }

  // Initial version creation
  function doCreate(referenceImages: string[]) {
    // Reset any existing state
    reset();

    setReferenceImages(referenceImages);
    if (referenceImages.length > 0) {
      doGenerateCode(
        {
          generationType: "create",
          image: referenceImages[0],
        },
        currentVersion
      );
    }
  }

  // Subsequent updates
  async function doUpdate() {
    if (currentVersion === null) {
      toast.error(
        "No current version set. Contact support or open a Github issue."
      );
      return;
    }

    const updatedHistory = [
      ...extractHistoryTree(appHistory, currentVersion),
      updateInstruction,
    ];

    if (shouldIncludeResultImage) {
      const resultImage = await takeScreenshot();
      doGenerateCode(
        {
          generationType: "update",
          image: referenceImages[0],
          resultImage: resultImage,
          history: updatedHistory,
        },
        currentVersion
      );
    } else {
      doGenerateCode(
        {
          generationType: "update",
          image: referenceImages[0],
          history: updatedHistory,
        },
        currentVersion
      );
    }

    setGeneratedCode("");
    setUpdateInstruction("");
  }

  useEffect(() => {
    if (
      updateInstruction.includes("Fix the code error and re-output the code")
    ) {
      doUpdate();
    }
  }, [updateInstruction]);

  async function fixBug(error: { message: string; stack: string }) {
    const errorPrompt = `
Fix the code error and re-output the code.
error message:
${error.message}
${error.stack}
    `;
    setUpdateInstruction(errorPrompt);
  }

  return (
    <div className="dark:bg-black dark:text-white h-full">
      <div className="md:fixed md:inset-y-0 md:z-40 md:flex md:w-96 md:flex-col">
        <div className="flex grow flex-col gap-y-2 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:bg-zinc-950 dark:text-white">
          <div className="bg-white flex justify-between p-2 pl-4 border-b-[1px] border-r-[1px] fixed left-0 lg:w-96 z-[49]">
            <Header />
          </div>
          <div className="flex items-center justify-between mb-2 mt-20">
            <OutputSettingsSection
              generatedCodeConfig={settings.generatedCodeConfig}
              setGeneratedCodeConfig={(config: GeneratedCodeConfig) =>
                setSettings((prev) => ({
                  ...prev,
                  generatedCodeConfig: config,
                }))
              }
              shouldDisableUpdates={
                appState === AppState.CODING || appState === AppState.CODE_READY
              }
            />
            <div className="flex">
              {appState === AppState.CODE_READY && (
                <>
                  <span
                    onClick={reset}
                    className="hover:bg-slate-200 p-2 rounded-sm">
                    <FaUndo />
                    {/* Reset */}
                  </span>
                  <span
                    onClick={downloadCode}
                    className="hover:bg-slate-200 p-2 rounded-sm">
                    <FaDownload />
                  </span>
                </>
              )}
              <SettingsDialog
                settings={settings}
                setSettings={setSettings}
                Config={Config}
              />
            </div>
          </div>

          {IS_OPENAI_DOWN && (
            <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded">
              OpenAI API is currently down. Try back in 30 minutes or later. We
              apologize for the inconvenience.
            </div>
          )}

          {(appState === AppState.CODING ||
            appState === AppState.CODE_READY) && (
            <>
              {/* Show code preview only when coding */}
              {appState === AppState.CODING && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-x-1">
                    <Spinner />
                    {executionConsole.slice(-1)[0]}
                  </div>
                  <div className="flex mt-4 w-full">
                    <Button
                      onClick={stop}
                      className="w-full dark:text-white dark:bg-gray-700">
                      {t("Cancel")}
                    </Button>
                  </div>
                  <CodePreview code={generatedCode} />
                </div>
              )}

              {appState === AppState.CODE_READY && (
                <div>
                  <div className="grid w-full gap-2">
                    <Textarea
                      placeholder={t("Tell Ai what do you want to modify...")!}
                      onChange={(e) => setUpdateInstruction(e.target.value)}
                      value={updateInstruction}
                    />
                    <div className="flex justify-between items-center gap-x-2">
                      <div className="font-500 text-xs text-slate-700 dark:text-white">
                        {t("Include screenshots of the current version?")}
                      </div>
                      <Switch
                        checked={shouldIncludeResultImage}
                        onCheckedChange={setShouldIncludeResultImage}
                        className="dark:bg-gray-700"
                      />
                    </div>
                    <Button
                      onClick={doUpdate}
                      className="dark:text-white dark:bg-gray-700">
                      {t("Update")}
                    </Button>
                  </div>
                </div>
              )}

              {/* Reference image display */}
              <div className="flex gap-x-2 mt-2">
                <div className="flex flex-col">
                  <div
                    className={classNames({
                      "scanning relative": appState === AppState.CODING,
                    })}>
                    <img
                      className="w-[340px] border border-gray-200 rounded-md"
                      src={referenceImages[0]}
                      alt="Reference"
                    />
                  </div>
                  <div className="text-gray-400 uppercase text-sm text-center mt-1">
                    {t("Original image")}
                  </div>
                </div>
                <div className="bg-gray-400 px-4 py-2 rounded text-sm hidden">
                  <h2 className="text-lg mb-4 border-b border-gray-800">
                    Console
                  </h2>
                  {executionConsole.map((line, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-400 mb-2 text-gray-600 font-mono">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {
            <HistoryDisplay
              history={appHistory}
              currentVersion={currentVersion}
              revertToVersion={(index) => {
                if (
                  index < 0 ||
                  index >= appHistory.length ||
                  !appHistory[index]
                )
                  return;
                setCurrentVersion(index);
                setGeneratedCode(appHistory[index].code);
              }}
              shouldDisableReverts={appState === AppState.CODING}
            />
          }
          <PromptPanel settings={settings} setSettings={setSettings} />
          <DemoVide />
          <AccessCode />
        </div>
      </div>
      {/* {classNames(
            "absolute left-[50%] -ml-[300px] z-[4] flex flex-col justify-center items-center gap-y-10 w-[600px] top-32",
            {"hidden": !showImageUpload}
          )} */}
      <main className="lg:ml-96 relative h-screen">
        <div
          className={classNames("h-full", {
            hidden: !(appState === AppState.INITIAL),
          })}
          onClick={() => {
            setShowImageUpload(false);
          }}>
          <Whiteboard doCreate={doCreate} />
        </div>

        {appState === AppState.INITIAL && (
          <div className="absolute top-48 right-3 z-[10]">
            <div
              title="切换模式"
              onClick={() => setShowImageUpload(!showImageUpload)}
              className="flex justify-center items-center w-12 h-12 rounded-full ring-1 ring-slate-400/50 hover:bg-slate-200 text-slate-400 size-2 mb-2">
              <FaCloudUploadAlt />
            </div>
          </div>
        )}

        {appState === AppState.INITIAL && (
          <div
            className={classNames(
              "absolute left-[50%] -ml-[300px] z-[4] flex flex-col justify-center items-center gap-y-10 w-[600px] top-32",
              { hidden: !showImageUpload }
            )}>
            <ImageUpload setReferenceImages={doCreate} />
            {/* <UrlInputSection
              doCreate={doCreate}
              screenshotOneApiKey={settings.screenshotOneApiKey}
            /> */}
          </div>
        )}

        {(appState === AppState.CODING || appState === AppState.CODE_READY) &&
          showPreview && (
            <div className="mt-4 z-[10] w-[100%]">
              <Tabs
                defaultValue={
                  settings.generatedCodeConfig ==
                  GeneratedCodeConfig.REACT_NATIVE
                    ? "native"
                    : "desktop"
                }>
                <div className="flex justify-end mr-8 mb-4">
                  <TabsList>
                    {settings.generatedCodeConfig ===
                    GeneratedCodeConfig.REACT_NATIVE ? (
                      <TabsTrigger value="native" className="flex gap-x-2">
                        <FaDesktop /> native Mobile
                      </TabsTrigger>
                    ) : (
                      <>
                        <TabsTrigger value="desktop" className="flex gap-x-2">
                          <FaDesktop /> {t("Desktop")}
                        </TabsTrigger>
                        <TabsTrigger value="mobile" className="flex gap-x-2">
                          <FaMobile /> {t("Mobile")}
                        </TabsTrigger>
                      </>
                    )}
                    <TabsTrigger value="code" className="flex gap-x-2">
                      <FaCode />
                      {t("Code")}
                    </TabsTrigger>
                  </TabsList>
                </div>
                {settings.generatedCodeConfig ===
                GeneratedCodeConfig.REACT_NATIVE ? (
                  <TabsContent value="native">
                    <NativePreview code={generatedCode} appState={appState} />
                  </TabsContent>
                ) : (
                  <>
                    <TabsContent value="desktop">
                      <Preview
                        code={generatedCode}
                        device="desktop"
                        appState={appState}
                        fixBug={fixBug}
                      />
                    </TabsContent>
                    <TabsContent value="mobile">
                      <Preview
                        code={generatedCode}
                        device="mobile"
                        appState={appState}
                        fixBug={fixBug}
                      />
                    </TabsContent>
                  </>
                )}
                <TabsContent value="code">
                  <CodeTab
                    code={generatedCode}
                    setCode={setGeneratedCode}
                    settings={settings}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
      </main>
    </div>
  );
}

export default App;
