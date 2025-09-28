"use client";

/* eslint-disable @next/next/no-img-element */
import { twMerge } from "tailwind-merge";

import DuzinhoIcon from "@/components/DuzinhoIcon";

type QuestionFeedbackProps = {
  correct: boolean;
};

const QuestionFeedback = ({ correct }: QuestionFeedbackProps) => {
  return (
    <div className="flex items-end gap-[16px]">
      <div className="flex items-center justify-center h-[60px] w-[60px] rounded-[24px] bg-[#2056F2]">
        <DuzinhoIcon
          mode={correct ? "happy" : "sad"}
          className="w-[42px] h-[42px]"
        />
      </div>

      <div
        className={twMerge(
          "flex flex-col gap-[8px] w-full max-w-[468px] border dark:border-[#FFFFFF0D] bg-[#d7dae3] dark:bg-[#192031] border-[#E9EAEC] rounded-[36px] p-[24px]",
          correct
            ? "bg-[#cee0d8] dark:bg-[#192031]"
            : "bg-[#e1d5d5] dark:bg-[#192031]",
        )}
      >
        <span className="text-[16px] dark:text-white">A resposta está:</span>
        <span
          className={twMerge(
            "font-extrabold text-[32px]",
            correct ? "text-[#1CD475]" : "text-[#E8493F]",
          )}
        >
          {correct ? "Correta!" : "Incorreta!"}
        </span>
      </div>
    </div>
  );
};

export default QuestionFeedback;
