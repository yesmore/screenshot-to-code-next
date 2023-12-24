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

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

function SettingsDialog({ settings, setSettings }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="hover:bg-slate-200 rounded-sm pl-2 pr-2">
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
          <Label htmlFor="openai-api-key">
            <div className=" text-slate-600 font-bold">OpenAI API key</div>
            <div className="font-light mt-2 leading-relaxed">
              仅存储在你的本地浏览器中。没有 GPT-4 Key ? 试试{" "}
              <a
                className=" text-cyan-500 font-bold"
                href="https://open.taoist.fun"
                target="__blank">
                Taoist API
              </a>
              &nbsp;代理，限时超低比例充值，支持 GPT-4 Vision 模型
            </div>
          </Label>

          <Input
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

          {
            <>
              <Label htmlFor="openai-api-key">
                <div className=" text-slate-600 font-bold">
                  OpenAI Base URL (可选)
                </div>
                <div className="font-light mt-2 leading-relaxed">
                  如果不想使用默认URL，请替换为代理URL，如
                  https://api.openai.com/v1 或 https://open.taoist.fun/v1
                </div>
              </Label>

              <Input
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
          }
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="image-generation">
            <div className=" text-slate-600 font-bold">mock AI response</div>
            <div className="font-light mt-2">模拟 AI 生成响应数据</div>
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

        <DialogFooter>
          <DialogClose>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
