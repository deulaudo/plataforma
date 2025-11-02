"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/lib/utils";

import ModuleContent from "./ModuleContent";

type ModuleCardProps = {
  module: ModuleType;
  courseId: string;
  currentVideo?: VideoType;
  contentClassName?: string;
  handleVideoSelect?: (videoId: string) => void;
  isCardExpandedByDefault?: boolean;
};

const ModuleCard = ({
  module,
  courseId,
  currentVideo,
  contentClassName,
  handleVideoSelect,
  isCardExpandedByDefault = true,
}: ModuleCardProps) => {
  const { theme } = useTheme();
  const [isCardExpanded, setIsCardExpanded] = useState<boolean>(
    isCardExpandedByDefault,
  );

  const moduleDone = useMemo(
    () => module.totalWatched === module.totalVideos,
    [module],
  );

  useEffect(() => {
    if (currentVideo) {
      setIsCardExpanded(true);
    }
  }, [currentVideo]);

  return (
    <div
      className={twMerge(
        `flex min-h-[120px] w-full flex-col gap-2 py-[24px] px-[16px] ${moduleDone ? "dark:bg-[#101F25] bg-[#ECFBF4]" : "dark:bg-[#10182C] bg-[#EDF1FE]"} rounded-[36px] border border-[#FFFFFF0D]`,
        contentClassName,
      )}
    >
      <div className="flex gap-3 items-center">
        <div
          className={cn(
            "flex justify-center items-center w-[52px] h-[52px] p-[4px] rounded-[20px] border border-[#E9EAEC] dark:border-[#FFFFFF0D]",
            theme === "light" && !moduleDone && "bg-[#2056f2]",
            theme === "light" && moduleDone && "bg-[#1ed475]",
          )}
        >
          {module.cover ? (
            <img alt="Capa" className="w-[25px] h-[25px]" src={module.cover} />
          ) : (
            <img
              alt="Capa"
              className="w-[25px] h-[25px]"
              src="/icons/lightbulb.svg"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="font-bold text-[16px] dark:text-white">
            {module.title}
          </span>
          {module.totalVideos > 0 && (
            <span
              className={`font-bold text-[12px] ${moduleDone ? "text-[#1CD475]" : "text-[#2056F2]"}`}
            >
              {module.totalVideos} aula{module.totalVideos > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {isCardExpanded ? (
          <ChevronUp
            className="dark:text-[#4b505d] text-[#7c7d80] cursor-pointer"
            onClick={() => setIsCardExpanded(false)}
          />
        ) : (
          <ChevronDown
            className="dark:text-[#4b505d] text-[#7c7d80] cursor-pointer"
            onClick={() => setIsCardExpanded(true)}
          />
        )}
      </div>

      <div className="flex w-full p-[4px]">
        <p className="font-normal text-[12px] text-justify text-[#000000] dark:text-white">
          {module.description.length > 1 ? module.description : ""}
        </p>
      </div>

      <ModuleContent
        courseId={courseId}
        moduleId={module.id}
        currentVideoId={currentVideo?.id}
        isExpanded={isCardExpanded}
        handleVideoSelect={handleVideoSelect}
      />
    </div>
  );
};

export default ModuleCard;
