"use client";
import { coursesService } from '@/services/coursesService';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useCallback, useState } from 'react';
import ModuleItem from './ModuleItem';
import { useRouter } from "next/navigation";
import VideoItem from './VideoItem';

type ModuleContentProps = {
  isExpanded: boolean;
  moduleId: string;
  onChooseVideo: (video: VideoType) => void;
};

const ModuleContent = ({
  isExpanded,
  moduleId,
  onChooseVideo,
}: ModuleContentProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [currentVideoId, setCurrentVideoId] = useState<string>();
  const { data: videos, isPending: isPedingVideos } = useQuery({
    queryKey: ["videos", moduleId, isExpanded],
    queryFn: async () => {
      if (isExpanded) {
        return await coursesService.listVideos(moduleId);
      }

      return Promise.resolve([]);
    },
  });

  const goToVideo = useCallback((video: VideoType) => {
    onChooseVideo(video);
    setCurrentVideoId(video.id);
  }, []);

  return (<>
    {isExpanded && (<div className="flex gap-4 flex-col mt-[16px]">
      {isPedingVideos ? (
        <Loader className="animate-spin" />
      ) : videos?.sort((v1, v2) => (+v1.videoId > +v2.videoId) ? 1 : 0).map((video, index) => (
        <VideoItem watching={currentVideoId === video.id} video={video} order={index + 1} onVideoClick={goToVideo} key={video.id} />
      ))}
    </div>)}
  </>
  );
};

export default ModuleContent;