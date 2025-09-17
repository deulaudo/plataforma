"use client";

import { CustomStudyQuestion } from "@/types/customStudyType";

/* eslint-disable @next/next/no-img-element */

type QuestionTextProps = {
  questionNumber: number;
  question: CustomStudyQuestion;
};

const QuestionText = ({ questionNumber, question }: QuestionTextProps) => {
  return (
    <div className="flex items-end gap-[16px]">
      <div className="flex items-center justify-center h-[60px] w-[60px] rounded-[24px] bg-[#2056F2]">
        <img
          src="/images/Duzinho.png"
          alt="Duzinho"
          className="w-[36px] h-[36px]"
        />
      </div>

      <div className="flex flex-col gap-[8px] w-full max-w-[468px] border dark:border-[#FFFFFF0D] bg-[#d7dae3] dark:bg-[#192031] border-[#E9EAEC] rounded-[36px] p-[24px]">
        <span className="font-bold text-[16px] text-[#2056F2]">
          Questão {questionNumber}
        </span>
        <p className="font-semibold text-[16px] text-[#000000] dark:text-white">
          {question.question}
        </p>
      </div>
    </div>
  );
};

export default QuestionText;
