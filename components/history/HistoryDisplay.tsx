import { History } from "./history_types";
import toast from "react-hot-toast";
import classNames from "classnames";

import { Badge } from "../shared/badge";
import { renderHistory } from "./utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../shared/collapsible";
import { Button } from "../shared/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

interface Props {
  history: History;
  currentVersion: number | null;
  revertToVersion: (version: number) => void;
  shouldDisableReverts: boolean;
}

export default function HistoryDisplay({
  history,
  currentVersion,
  revertToVersion,
  shouldDisableReverts,
}: Props) {
  const renderedHistory = renderHistory(history, currentVersion);
  const { t } = useTranslation("draw");

  return renderedHistory.length === 0 ? null : (
    <div className="flex flex-col h-screen">
      <h1 className="mb-2 text-slate-500 font-bold">{t("Version")}</h1>
      <ul className="space-y-0 flex flex-col-reverse">
        {renderedHistory.map((item, index) => (
          <li key={index}>
            <Collapsible>
              <div
                className={classNames(
                  "flex items-center justify-between space-x-2 w-full pr-2",
                  "border-b cursor-pointer",
                  {
                    " hover:bg-black hover:text-white": !item.isActive,
                    "bg-slate-500 text-white": item.isActive,
                  }
                )}>
                <div
                  className="flex justify-between truncate flex-1 p-2"
                  onClick={() =>
                    shouldDisableReverts
                      ? toast.error(
                          "Please wait for code generation to complete before viewing an older version."
                        )
                      : revertToVersion(index)
                  }>
                  <div className="flex gap-x-1 truncate">
                    <h2 className="text-sm truncate">{item.summary}</h2>
                    {item.parentVersion !== null && (
                      <h2 className="text-sm">
                        (parent: {item.parentVersion})
                      </h2>
                    )}
                  </div>
                  <h2 className="text-sm">v{index + 1}</h2>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6">
                    <CaretSortIcon className="h-4 w-4" />
                    <span className="sr-only">{t("Toggle")}</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="w-full bg-slate-300 p-2">
                <div>
                  {t("Full prompt")}: {item.summary}
                </div>
                <div className="flex justify-end">
                  <Badge>{item.type}</Badge>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </li>
        ))}
      </ul>
    </div>
  );
}
