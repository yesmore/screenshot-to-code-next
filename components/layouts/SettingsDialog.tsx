"use client";
import React, { FunctionComponent } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";
import { FaCog } from "react-icons/fa";
import { Settings } from "../types";
import { Switch } from "../shared/switch";
import { Label } from "../shared/label";
import { Input } from "../shared/input";

import { useTranslation } from "react-i18next";
import Button from "../shared/button";

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  Config?: FunctionComponent;
}

const llm = [
  {
    title: "OpenAI",
    value: "OpenAi",
  },
  {
    title: "Gemini (free)",
    value: "Gemini",
  },
];

function SettingsDialog({ settings, setSettings, Config }: Props) {
  const { t } = useTranslation("draw");

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-slate-200 rounded-sm p-2">
        <FaCog />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 ">{t("Settings")}</DialogTitle>
        </DialogHeader>

        {/* <div className="flex items-center space-x-2">
          <Label htmlFor="image-generation">
            <div>DALL-E Placeholder Image Generation</div>
            <div className="font-light mt-2">
              More fun with it but if you want to save money, turn it off.
            </div>
          </Label>
          <Switch
            id="image-generation"
            checked={settings.isImageGenerationEnabled}
            onCheckedChange={() =>
              setSettings((s) => ({
                ...s,
                isImageGenerationEnabled: !s.isImageGenerationEnabled,
              }))
            }
          />
        </div> */}
        <div className="flex flex-col space-y-4">
          <div className="space-y-4 bg-slate-200 p-4 mt-2 mb-3 rounded dark:text-white dark:bg-slate-800">
            <Label htmlFor="openai-api-key">
              <div className=" text-slate-600 font-bold">
                {t("Access key")} ({t("Only OpenAI model")})
              </div>
            </Label>
            <Input
              className=" text-slate-400 placeholder:text-slate-400 border-slate-100"
              id="openai-api-key"
              placeholder={t("Input your access code")!}
              value={settings.openAiApiKey || ""}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  openAiApiKey: e.target.value,
                }))
              }
            />
            <div className="flex items-center justify-between">
              <a href="https://shop.taoist.fun/buy/54" target="_blank">
                <Button size="sm" variant="secondary">
                  {t("Buy credits")}
                </Button>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="openai-api-key">
              <div className=" text-slate-600 font-bold">
                {t("Select model")}
              </div>
            </Label>
            <div className="">
              {llm.map((item) => (
                <label className="ml-4" key={item.value}>
                  <input
                    className=""
                    type="radio"
                    name="radio"
                    value={item.value}
                    checked={settings.llm === item.value}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        llm: e.target.value,
                      }))
                    }
                  />
                  {item.title}
                </label>
              ))}
            </div>
          </div>

          {settings.llm === "Gemini" && (
            <>
              <Label htmlFor="gemini-api-key">
                <div className=" text-slate-600 font-bold">
                  {t("Gemini API Key")}
                </div>
                <div className="font-light mt-2 leading-relaxed text-slate-400 text-xs">
                  {t(
                    "Only stored in your browser. Never stored on servers. Overrides your .env"
                  )}
                </div>
              </Label>
              <Input
                className=" text-slate-400 placeholder:text-slate-400"
                id="gemini-api-key"
                placeholder={t("Gemini API Key")!}
                value={settings.geminiApiKey || ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    geminiApiKey: e.target.value,
                  }))
                }
              />
            </>
          )}

          {settings.llm !== "Gemini" && (
            <>
              <Label htmlFor="openai-api-key">
                <div className=" text-slate-600 font-bold">
                  {t("OpenAI API Key")}
                </div>
                <div className="font-light mt-2 leading-relaxed text-slate-400 text-xs">
                  {t(
                    "Only stored in your browser. Never stored on servers. Overrides your .env"
                  )}
                </div>
              </Label>
              <Input
                className=" text-slate-400 placeholder:text-slate-400"
                id="openai-api-key"
                placeholder={t("OpenAI API Key")!}
                value={settings.openAiApiKey || ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    openAiApiKey: e.target.value,
                  }))
                }
              />
            </>
          )}

          {settings.llm !== "Gemini" && (
            <>
              <Label htmlFor="openai-api-key">
                <div className=" text-slate-600 font-bold">
                  {t("OpenAI Base URL")}
                </div>
                <div className="font-light mt-2 leading-relaxed text-slate-400 text-xs">
                  {t(
                    "If you dont want to use the default URL, replace it with the proxy URL."
                  )}
                </div>
              </Label>

              <Input
                className=" text-slate-400 placeholder:text-slate-400"
                id="openai-base-url"
                placeholder={t("OpenAI Base URL")!}
                value={settings.openAiBaseURL || ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    openAiBaseURL: e.target.value,
                  }))
                }
              />
            </>
          )}
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="image-generation">
            <div className=" text-slate-600 font-bold">
              {t("Mock AI response")}
            </div>
            <div className="font-light mt-2 text-slate-400 text-xs">
              {t(
                "Simulate AI to generate response data (without consuming quota, only for effect display)"
              )}
            </div>
          </Label>
          <Switch
            id="image-generation"
            checked={settings.mockAiResponse}
            onCheckedChange={() =>
              setSettings((s) => ({
                ...s,
                mockAiResponse: !s.mockAiResponse,
              }))
            }
          />
        </div>

        {Config ? <Config /> : null}

        {/* <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-slate-600 font-bold">
              主题设置
            </AccordionTrigger>
            <AccordionContent className="space-y-4 flex flex-col">
              <div className="flex items-center justify-between">
                <Label htmlFor="app-theme">
                  <div className=" text-sm">系统颜色</div>
                </Label>
                <div>
                  <button
                    className="flex rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50t"
                    onClick={() => {
                      document
                        .querySelector("div.mt-2")
                        ?.classList.toggle("dark"); // enable dark mode for sidebar
                      document.body.classList.toggle("dark");
                      document
                        .querySelector('div[role="presentation"]')
                        ?.classList.toggle("dark"); // enable dark mode for upload container

                      // let draw = document.querySelector(".excalidraw");
                      // if (draw?.classList.contains("theme--dark")) {
                      //   draw?.classList.remove("theme--dark");
                      // } else {
                      //   draw?.classList.add("theme--dark");
                      // }
                    }}>
                    切换系统颜色
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}

        <DialogFooter className="pt-4 border-t border-slate-100">
          <DialogClose>{t("Save")}</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
