"use client";
import { useTranslation } from "react-i18next";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../shared/accordion";
import Label from "../shared/label";

export default function DemoVide() {
  const { t } = useTranslation("draw");
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-slate-500 font-bold text-sm">
            {t("View examples")}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 flex flex-col">
            <div className="flex flex-col items-center justify-between">
              <Label className="mb-2">Demo 1</Label>
              <video
                src="https://img.aoau.top/draw/image-to-code-1.mp4"
                controls></video>
              <Label className="mt-4 mb-2">Demo 2</Label>
              <video
                src="https://img.aoau.top/draw/image-to-code.mp4"
                controls></video>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
