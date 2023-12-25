import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCog } from "react-icons/fa";
import { Settings } from "../types";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

function SettingsDialog({ settings, setSettings }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="hover:bg-slate-200 rounded-sm p-2">
        <FaCog />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 ">Settings</DialogTitle>
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
          <div className="space-y-4 bg-slate-200 p-4 rounded dark:text-white dark:bg-slate-800">
            🎉 每日提供 <strong>$2</strong> 公用额度免费使用，需要更多额度请前往{" "}
            <a
              className=" text-cyan-600 font-bold"
              href="https://shop.taoist.fun/buy/54"
              target="__blank">
              此处获取
            </a>
            。
          </div>
          <Label htmlFor="openai-api-key">
            <div className=" text-slate-600 font-bold">OpenAI API key</div>
            <div className="font-light mt-2 leading-relaxed text-slate-400 text-xs">
              在此处填写激活 sk-xxxx，仅存储在你的本地浏览器中。
            </div>
          </Label>

          <Input
            className=" text-slate-400 placeholder:text-slate-400"
            id="openai-api-key"
            placeholder="OpenAI API key"
            value={settings.openAiApiKey || ""}
            onChange={(e) =>
              setSettings((s) => ({
                ...s,
                openAiApiKey: e.target.value,
              }))
            }
          />

          {/* {
            <>
              <Label htmlFor="openai-api-key">
                <div className=" text-slate-600 font-bold">
                  OpenAI Base URL (可选)
                </div>
                <div className="font-light mt-2 leading-relaxed text-slate-400 text-xs">
                  如果不想使用默认URL，请替换为代理URL，如
                  https://api.openai.com/v1 或 https://open.taoist.fun/v1
                </div>
              </Label>

              <Input
                className=" text-slate-400 placeholder:text-slate-400"
                id="openai-base-url"
                placeholder="OpenAI Base URL"
                value={settings.openAiBaseURL || ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    openAiBaseURL: e.target.value,
                  }))
                }
              />
            </>
          } */}
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="image-generation">
            <div className=" text-slate-600 font-bold">mock AI response</div>
            <div className="font-light mt-2 text-slate-400 text-xs">
              模拟 AI 生成响应数据
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

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-slate-600 font-bold">
              Theme Settings
            </AccordionTrigger>
            <AccordionContent className="space-y-4 flex flex-col">
              <div className="flex items-center justify-between">
                <Label htmlFor="app-theme">
                  <div className=" text-sm">App Theme</div>
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
                    Toggle dark mode
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DialogFooter>
          <DialogClose>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
