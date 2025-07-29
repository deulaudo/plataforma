"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button";
import { ExamMode, ExamSubcategoryQuestion } from "@/types/examType";

type QuestionAlternativesProps = {
  question: ExamSubcategoryQuestion;
  mode?: ExamMode;
};

const QuestionAlternatives = ({
  question,
  mode,
}: QuestionAlternativesProps) => {
  const [selectedAlternative, setSelectedAlternative] = useState<string>();

  return (
    <div className="flex flex-col gap-[36px] w-full min-w-[516px] max-w-[516px] p-[24px] mx-auto dark:bg-[#192031] bg-[#e0e1e3] border dark:border-[#FFFFFF0D] border-[#E9EAEC] rounded-[48px]">
      <div className="flex flex-col gap-4">
        {question.alternatives.map((alternative, index) => (
          <div
            key={index}
            className={twMerge(
              "cursor-pointer flex justify-center p-[12px] rounded-[36px] dark:bg-[#141926] bg-[#edeeef] font-semibold text-[12px]",
              selectedAlternative === alternative.id &&
                "border-2 border-[#2056F2]",
            )}
            onClick={() => setSelectedAlternative(alternative.id)}
          >
            {alternative.text}
          </div>
        ))}
      </div>

      <Button theme="blue">Confirmar</Button>
    </div>
  );
};

export default QuestionAlternatives;
