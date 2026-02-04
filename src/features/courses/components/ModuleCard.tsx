"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import IconButton from "@/components/IconButton";
import TagSelector from "@/components/TagSelector";
import { cn } from "@/lib/utils";
import { coursesService } from "@/services/coursesService";

import ModuleContent from "./ModuleContent";

type ModuleCardProps = {
  module: ModuleType;
  courseId: string;
  showTagSelector?: boolean;
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
  showTagSelector = false,
  isCardExpandedByDefault = true,
}: ModuleCardProps) => {
  const { theme } = useTheme();
  const [isCardExpanded, setIsCardExpanded] = useState<boolean>(
    isCardExpandedByDefault,
  );
  const [localSelectedTagIds, setLocalSelectedTagIds] = useState<string[]>([]);

  const { data: videos, isPending: isPendingVideos } = useQuery({
    queryKey: ["videos", module.id, isCardExpanded],
    queryFn: async () => {
      if (isCardExpanded) {
        return await coursesService.listVideos(module.id);
      }

      return Promise.resolve([]);
    },
  });

  const moduleDone = useMemo(
    () => module.totalWatched === module.totalVideos,
    [module],
  );

  useEffect(() => {
    if (currentVideo) {
      setIsCardExpanded(true);
    }
  }, [currentVideo]);

  const filteredVideos = useMemo(() => {
    if (!localSelectedTagIds.length) return videos ?? [];
    return (videos ?? []).filter((video) =>
      video.tags?.some((tag) => localSelectedTagIds.includes(tag.id)),
    );
  }, [videos, localSelectedTagIds]);

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
          {module.cover && module.cover.length > 1 ? (
            <img alt="Capa" className="w-[25px] h-[25px]" src={module.cover} />
          ) : (
            <img
              alt="Capa"
              className="w-[25px] h-[25px]"
              src="/icons/lightbulb-white.svg"
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
          <IconButton
            icon={<ChevronUp />}
            onClick={() => setIsCardExpanded(false)}
          />
        ) : (
          <IconButton
            icon={<ChevronDown />}
            onClick={() => setIsCardExpanded(true)}
          />
        )}
      </div>
      <div className="flex w-full p-[4px]">
        <p className="font-normal text-[12px] text-justify text-[#000000] dark:text-white">
          {module.description.length > 1 ? module.description : ""}
        </p>
      </div>

      {showTagSelector && (
        <TagSelector
          courseMode
          moduleId={module.id}
          value={localSelectedTagIds}
          onTagChange={setLocalSelectedTagIds}
        />
      )}

      <ModuleContent
        courseId={courseId}
        moduleId={module.id}
        videos={filteredVideos ?? []}
        isPendingVideos={isPendingVideos}
        currentVideoId={currentVideo?.id}
        isExpanded={isCardExpanded}
        handleVideoSelect={handleVideoSelect}
      />
    </div>
  );
};

export default ModuleCard;
