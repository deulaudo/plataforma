"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useCallback } from "react";

import { useRouter } from "next/navigation";

import { coursesService } from "@/services/coursesService";

import VideoItem from "./VideoItem";

type ModuleContentProps = {
  courseId: string;
  moduleId: string;
  isExpanded: boolean;
  currentVideoId?: string;
  handleVideoSelect?: (videoId: string) => void;
};

const ModuleContent = ({
  courseId,
  moduleId,
  isExpanded,
  currentVideoId,
  handleVideoSelect,
}: ModuleContentProps) => {
  const { back, push } = useRouter();
  const { data: videos, isPending: isPedingVideos } = useQuery({
    queryKey: ["videos", moduleId, isExpanded],
    queryFn: async () => {
      if (isExpanded) {
        return await coursesService.listVideos(moduleId);
      }

      return Promise.resolve([]);
    },
  });

  const goToVideo = useCallback(
    (courseId: string, moduleId: string, videoId: string) => {
      if (handleVideoSelect) {
        handleVideoSelect(videoId);
        return;
      }

      push(`/courses/${courseId}/modules/${moduleId}?video=${videoId}`, {});
    },
    [handleVideoSelect, push],
  );

  return (
    <>
      {isExpanded && (
        <div className="flex gap-4 flex-col mt-[16px]">
          {isPedingVideos ? (
            <Loader className="animate-spin" />
          ) : (
            videos
              ?.sort((v1, v2) => (+v1.videoId > +v2.videoId ? 1 : 0))
              .map((video, index) => (
                <VideoItem
                  watching={currentVideoId === video.id}
                  video={video}
                  order={index + 1}
                  onVideoClick={() => {
                    goToVideo(courseId, moduleId, video.id);
                  }}
                  key={video.id}
                />
              ))
          )}
        </div>
      )}
    </>
  );
};

export default ModuleContent;
