"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useCallback } from "react";

import { coursesService } from "@/services/coursesService";

import VideoItem from "./VideoItem";

type ModuleContentProps = {
  isExpanded: boolean;
  moduleId: string;
  currentVideoId?: string;
  someVideoWatched: boolean;
  onChooseVideo: (video: VideoType) => void;
};

const ModuleContent = ({
  isExpanded,
  moduleId,
  currentVideoId,
  someVideoWatched,
  onChooseVideo,
}: ModuleContentProps) => {
  const { data: videos, isPending: isPedingVideos } = useQuery({
    queryKey: ["videos", moduleId, isExpanded, someVideoWatched],
    queryFn: async () => {
      if (isExpanded) {
        return await coursesService.listVideos(moduleId);
      }

      return Promise.resolve([]);
    },
  });

  const goToVideo = useCallback(
    (video: VideoType) => {
      onChooseVideo(video);
    },
    [onChooseVideo],
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
                  onVideoClick={goToVideo}
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
