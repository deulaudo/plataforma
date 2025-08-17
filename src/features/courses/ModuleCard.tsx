"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ModuleContent from "./ModuleContent";

type ModuleCardProps = {
  module: ModuleType;
};

const ModuleCard = ({
  module,
}: ModuleCardProps) => {
  const router = useRouter();
  const [isCardExpanded, setIsCardExpanded] = useState<boolean>(true);

  const moduleDone = useMemo(() => module.totalWatched === module.totalVideos, [module]);

  return (
    <div className={`flex w-full min-h-[170px] flex-shrink-0 flex-col gap-2 py-[24px] px-[16px] ${moduleDone ? 'dark:bg-[#101F25] bg-[#ECFBF4]' : 'dark:bg-[#10182C] bg-[#EDF1FE]'} rounded-[36px] border border-[#FFFFFF0D] self-start`}>
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center w-[52px] h-[52px] p-[4px] rounded-[20px] border border-[#E9EAEC] dark:border-[#FFFFFF0D]">
          <img className="w-[25px] h-[25px]" src={module.cover} />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="font-bold text-[16px] dark:text-white">{module.title}</span>
          <span className={`font-bold text-[12px] ${moduleDone ? 'text-[#1CD475]' : 'text-[#2056F2]'}`}>
            {module.totalVideos} aulas
          </span>
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
          {module.description}
        </p>
      </div>

      <ModuleContent moduleId={module.id} isExpanded={isCardExpanded} />
    </div>
  );
};

export default ModuleCard;
