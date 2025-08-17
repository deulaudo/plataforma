"use client";
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useMemo } from 'react';

type VideoItemProps = {
  video: VideoType
  onModuleClick: (videoId: string) => void;
};

const VideoItem = ({
  video,
  onModuleClick,
}: VideoItemProps) => {
  const { theme } = useTheme();

  const videoDone = useMemo(() => video.wasWatched , [video]);

  return (
    <div className="flex cursor-pointer flex-1 justify-between pb-[16px] items-center border-b border-b-[#E9EAEC] dark:border-b[#FFFFFF0D]" onClick={() => {
      onModuleClick(video.id);
    }}>
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center w-[52px] h-[52px] p-[4px] rounded-[20px] border border-[#E9EAEC] dark:border-[#FFFFFF0D]">
          <img className="w-[25px] h-[25px]" src={video.thumbnailUrl} />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="font-bold text-[16px] dark:text-white">{video.title}</span>
        </div>
      </div>

      <CheckCircle2
          size={20}
          className={`${videoDone ? 'text-[#1CD475]' : 'text-[#808080] dark:text-[#4c515e]'} cursor-pointer`}
        />
    </div>
  );
}

export default VideoItem;