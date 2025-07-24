"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { useRouter } from "next/navigation";

type StudyQuestionCardProps = {
  id: string;
  subcategoryId: string;
  order: number;
  question: string;
  examAnswer: {
    id: string;
    correct: boolean;
  } | null;
};

const StudyQuestionCard = ({
  id,
  subcategoryId,
  order,
  question,
  examAnswer,
}: StudyQuestionCardProps) => {
  const router = useRouter();

  const questionIcon = useMemo(() => {
    if (examAnswer === null) {
      return <CircleCheck size={16} className="text-[#4c515e]" />;
    }

    if (examAnswer.correct) {
      return <CircleCheck size={16} className="text-[#46d475]" />;
    }

    return <CircleX size={16} className="text-[#e74a41]" />;
  }, [examAnswer]);

  return (
    <div
      onClick={() => {
        router.push(`/study-mode/${subcategoryId}?questionId=${id}`);
      }}
      className={twMerge(
        "cursor-pointer",
        "hover:bg-[#F5F5F5] dark:hover:bg-[#FFFFFF0D]",
        "flex flex-col gap-[8px]",
        "max-h-[186px] overflow-hidden",
        "w-[228px] py-[24px] px-[16px] rounded-[36px] border border-[#FFFFFF0D]",
        examAnswer === null && "dark:bg-[#0F1420] bg-[#FFFFFF]",
        examAnswer?.correct && "dark:bg-[#102328]",
        examAnswer?.correct === false && "dark:bg-[#201925]",
      )}
    >
      <div className="flex items-center gap-[8px] flex-shrink-0">
        {questionIcon}
        <h4 className="text-[16px] font-bold text-[#141926] dark:text-white">
          Questão {order}
        </h4>
      </div>
      <span className="font-semibold text-[12px] overflow-hidden text-ellipsis break-words line-clamp-6">
        {question}
      </span>
    </div>
  );
};

export default StudyQuestionCard;
