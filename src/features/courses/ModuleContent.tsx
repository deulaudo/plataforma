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
};

const ModuleContent = ({
  isExpanded,
  moduleId,
}: ModuleContentProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { data: videos, isPending: isPedingVideos } = useQuery({
    queryKey: ["videos", moduleId, isExpanded],
    queryFn: async () => {
      if (isExpanded) {
        return await coursesService.listVideos(moduleId);
      }

      return Promise.resolve([]);
    },
  });

  const goToModule = useCallback((videoId: string) => {
    console.log(videoId);
    // router.push(`/courses/videos/${moduleId}`);
  }, []);

  return (<>
    {isExpanded && (<div className="flex gap-4 flex-col mt-[16px]">
      {isPedingVideos ? (
        <Loader className="animate-spin" />
      ) : videos?.sort((v1, v2) => (+v1.videoId > +v2.videoId) ? 1 : 0).map((video) => (
        <VideoItem video={video} onModuleClick={goToModule} key={video.id} />
      ))}
    </div>)}
  </>
  );
};

export default ModuleContent;