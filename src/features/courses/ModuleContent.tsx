"use client";
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useMemo } from 'react';

type ModuleContentProps = {
  module: ModuleType
  onModuleClick: (moduleId: string) => void;
};

const ModuleContent = ({
  module,
  onModuleClick,
}: ModuleContentProps) => {
  const { theme } = useTheme();

  const moduleDone = useMemo(() => module.totalVideosWatched === module.totalVideos , []);

  return (
    <div className="flex cursor-pointer flex-1 justify-between pb-[16px] items-center border-b border-b-[#E9EAEC] dark:border-b[#FFFFFF0D]" onClick={() => {
      onModuleClick(module.id);
    }}>
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center w-[52px] h-[52px] p-[4px] rounded-[20px] border border-[#E9EAEC] dark:border-[#FFFFFF0D]">
          <img className="w-[25px] h-[25px]" src={module.cover} />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="font-bold text-[16px] dark:text-white">{module.title}</span>
          <span className={`font-bold text-[12px] ${moduleDone ? 'text-[#1CD475]' : 'text-[#2056F2]'}`}>
            {module.totalVideos} vídeo {module.totalVideos > 1 ? 'aulas' : 'aula'}
          </span>
        </div>
      </div>

      <CheckCircle2
          size={20}
          className={`${moduleDone ? 'text-[#1CD475]' : 'text-[#808080] dark:text-[#4c515e]'} cursor-pointer`}
        />
    </div>
  );
}

export default ModuleContent;