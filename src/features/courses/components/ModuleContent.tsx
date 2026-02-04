"use client";

import { Loader } from "lucide-react";
import React, { useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";

import VideoItem from "./VideoItem";

type ModuleContentProps = {
  courseId: string;
  moduleId: string;
  isExpanded: boolean;
  videos: VideoType[];
  isPendingVideos: boolean;
  currentVideoId?: string;
  handleVideoSelect?: (videoId: string) => void;
};

const ModuleContent = ({
  courseId,
  moduleId,
  isExpanded,
  videos,
  isPendingVideos,
  currentVideoId,
  handleVideoSelect,
}: ModuleContentProps) => {
  const { push } = useRouter();

  const sortedVideos = useMemo(
    () =>
      [...(videos ?? [])].sort((v1, v2) => (+v1.videoId > +v2.videoId ? 1 : 0)),
    [videos],
  );

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
          {isPendingVideos ? (
            <Loader className="animate-spin" />
          ) : sortedVideos.length === 0 ? (
            <div className="flex flex-col gap-2">
              <span className="text-[16px] text-center">
                Nenhum vídeo encontrado
              </span>
            </div>
          ) : (
            sortedVideos.map((video, index) => (
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
