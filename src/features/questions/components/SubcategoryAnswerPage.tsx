"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import ImageViewer from "@/components/ImageViewer";
import { ExamMode, ExamSubcategory } from "@/types/examType";

import QuestionAlternatives from "./QuestionAlternatives";
import QuestionText from "./QuestionText";

type SubcategoryAnswerPageProps = {
  subcategory: ExamSubcategory;
  mode?: ExamMode;
};

const SubcategoryAnswerPage = ({
  subcategory,
  mode,
}: SubcategoryAnswerPageProps) => {
  const searchParams = useSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    const questionId = searchParams.get("questionId");
    if (questionId) {
      const index = subcategory.exams.findIndex(
        (exam) => exam.id === questionId,
      );
      if (index !== -1) {
        setCurrentQuestionIndex(index);
      }
    }
  }, [searchParams, subcategory.exams]);

  return (
    <div className="flex flex-col gap-[48px] w-full max-w-[1280px] p-[24px] mx-auto dark:bg-[#141926] bg-[#edeeef] border dark:border-[#FFFFFF0D] border-[#E9EAEC] rounded-[80px]">
      <div className="flex self-start">
        <QuestionText
          question={subcategory.exams[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
        />
      </div>
      <div className="flex gap-4 self-end">
        {subcategory.exams[currentQuestionIndex].imageUrl && (
          <div className="flex-1">
            <ImageViewer
              imageUrl={subcategory.exams[currentQuestionIndex].imageUrl}
              altText="Question illustration"
              className="rounded-2xl max-h-[400px]"
            />
          </div>
        )}
        <QuestionAlternatives
          question={subcategory.exams[currentQuestionIndex]}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default SubcategoryAnswerPage;
