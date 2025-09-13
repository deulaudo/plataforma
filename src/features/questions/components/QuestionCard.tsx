"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

import { useRouter } from "next/navigation";

type QuestionCardProps = {
  id: string;
  subcategoryId: string;
  order: number;
  question: string;
  examAnswer: {
    id: string;
    correct: boolean;
  } | null;
  onClick?: () => void;
  mode: "STUDY" | "TEST";
  tags: {
    id: string;
    tag: string;
  }[];
};

const QuestionCard = ({
  id,
  subcategoryId,
  order,
  question,
  examAnswer,
  onClick,
  mode,
  tags,
}: QuestionCardProps) => {
  const router = useRouter();
  const isTestFinished =
    localStorage.getItem(`test:${subcategoryId}`) === "true";

  const questionIcon = useMemo(() => {
    if (mode === "TEST") {
      if (!isTestFinished) {
        return (
          <CircleCheck
            size={16}
            className={examAnswer === null ? "text-[#4c515e]" : "text-[blue]"}
          />
        );
      }
    }

    if (examAnswer === null) {
      return <CircleCheck size={16} className="text-[#4c515e]" />;
    }

    if (examAnswer.correct) {
      return <CircleCheck size={16} className="text-[#46d475]" />;
    }

    return <CircleX size={16} className="text-[#e74a41]" />;
  }, [examAnswer, isTestFinished, mode]);

  const questionBackgroundColor = useMemo(() => {
    if (mode === "TEST" && !isTestFinished) {
      return "dark:bg-[#0F1420] bg-[#FFFFFF]";
    }

    if (examAnswer === null) {
      return "dark:bg-[#0F1420] bg-[#FFFFFF]";
    }
    if (examAnswer.correct) {
      return "dark:bg-[#102328] bg-[#ecfbf5]";
    }
    return "dark:bg-[#201925] bg-[#faeef1]";
  }, [examAnswer, isTestFinished, mode]);

  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={twMerge(
        "cursor-pointer",
        "hover:bg-[#F5F5F5] dark:hover:bg-[#FFFFFF0D]",
        "flex flex-col gap-[8px]",
        "max-h-[250px] overflow-hidden",
        "w-[228px] py-[24px] px-[16px] rounded-[36px] border border-[#FFFFFF0D]",
        questionBackgroundColor,
      )}
    >
      <div className="flex items-center gap-[8px] flex-shrink-0">
        {questionIcon}
        <h4 className="text-[16px] font-bold text-[#141926] dark:text-white">
          Questão {order}
        </h4>
      </div>
      <span className="font-semibold text-[12px] overflow-hidden text-ellipsis break-words line-clamp-6 flex-1">
        {question}
      </span>

      {tags.length > 0 && (
        <div className="flex items-center gap-1 mt-2 self-end w-full">
          <div
            className="w-full px-2 py-1 bg-[#446be0] text-white font-bold text-[10px] rounded-full flex items-center gap-1"
            data-tooltip-id={`question-tags-${id}`}
            data-tooltip-content={tags.map((tag) => tag.tag).join(", ")}
          >
            <span>{tags[0].tag}</span>
            {tags.length > 1 && (
              <span className="text-white font-bold">+{tags.length - 1}</span>
            )}
          </div>
          {tags.length > 1 && <Tooltip id={`question-tags-${id}`} />}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
