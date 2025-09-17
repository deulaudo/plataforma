"use client";

import { ChevronRight, ListCheck } from "lucide-react";

import { useRouter } from "next/navigation";

import IconButton from "@/components/IconButton";

type CustomStudyCardProps = {
  id: string;
  name: string;
  questionsCount: number;
  questionsAnswered: number;
};

const CustomStudyCard = ({
  id,
  name,
  questionsCount,
  questionsAnswered,
}: CustomStudyCardProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-w-[400px] pt-[24px] px-[24px] pb-[24px] dark:bg-[#141926] bg-[#EDEEEF] rounded-[36px]">
      <div className="flex items-center gap-[16px]">
        <h2 className="text-[20px] font-bold text-[#141926] dark:text-white">
          {name}
        </h2>
        |
        <div className="flex gap-2 items-center">
          <ListCheck />
          {questionsAnswered} de {questionsCount}
        </div>
        <div className="flex flex-1 justify-end">
          <IconButton
            icon={<ChevronRight />}
            onClick={() => {
              router.push(`/custom-study/${id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomStudyCard;
