"use client";
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useMemo } from 'react';

type VideoItemProps = {
  order: number,
  video: VideoType
  onVideoClick: (video: VideoType) => void;
};

const VideoItem = ({
  order,
  video,
  onVideoClick,
}: VideoItemProps) => {
  const { theme } = useTheme();

  const videoDone = useMemo(() => video.wasWatched, [video]);

  return (
    <div className="flex cursor-pointer flex-1 justify-between pb-[16px] items-center border-b border-b-[#E9EAEC] dark:border-b[#FFFFFF0D]" onClick={() => {
      onVideoClick(video);
    }}>
      <div className="flex gap-3 items-center">
        <div className="flex relative justify-center cursor-pointer items-center w-[56px] h-[32px] rounded-[8px] border-[1px] border-[#E9EAEC] dark:border-[#FFFFFF0D]">
          <img className="object-contain rounded-[8px]" src={video.thumbnailUrl} />
          <img className="absolute" src="/icons/play.svg" />
        </div>
        <div className="flex flex-1 flex-col h-[32px]">
          <p className="font-normal text-[10px] text-justify text-[#00000080] dark:text-[#FFFFFF40]">
            Aula {order}
          </p>
          <span className="font-bold text-[12px] dark:text-white">{video.title}</span>
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