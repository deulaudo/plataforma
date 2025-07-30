"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import ImageViewer from "@/components/ImageViewer";
import { ExamMode, ExamSubcategory } from "@/types/examType";

import QuestionAlternatives from "./QuestionAlternatives";
import QuestionExplanation from "./QuestionExplanation";
import QuestionFeedback from "./QuestionFeedback";
import QuestionText from "./QuestionText";
import QuestionVideo from "./QuestionVideo";
import QuestionsCarousel from "./QuestionsCarousel";

type SubcategoryAnswerPageProps = {
  subcategory: ExamSubcategory;
  onQuestionAnswered: () => void;
  mode?: ExamMode;
};

const SubcategoryAnswerPage = ({
  subcategory,
  mode,
  onQuestionAnswered,
}: SubcategoryAnswerPageProps) => {
  const searchParams = useSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loadedQuestionFromURL, setLoadedQuestionFromURL] =
    useState<boolean>(false);
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState<
    "correct" | "incorrect" | null
  >(null);

  /**
   * Use effect para setar a questão escolhida via URL
   * na página de questões.
   */
  useEffect(() => {
    if (loadedQuestionFromURL) return;
    const questionId = searchParams.get("questionId");
    if (questionId) {
      const index = subcategory.exams.findIndex(
        (exam) => exam.id === questionId,
      );
      if (index !== -1) {
        setCurrentQuestionIndex(index);
        setLoadedQuestionFromURL(true);
      }
    }
  }, [loadedQuestionFromURL, searchParams, subcategory.exams]);

  /** Define estado da questão atual */
  useEffect(() => {
    const question = subcategory.exams[currentQuestionIndex];
    if (question) {
      const answer = question.examAnswer?.correct;
      if (answer !== undefined) {
        setCurrentQuestionStatus(answer ? "correct" : "incorrect");
      } else {
        setCurrentQuestionStatus(null);
      }
    } else {
      setCurrentQuestionStatus(null);
    }
  }, [currentQuestionIndex, subcategory.exams]);

  const showAnswer = useMemo(() => {
    if (mode === "STUDY") {
      return currentQuestionStatus !== null;
    }

    return false;
  }, [mode, currentQuestionStatus]);

  return (
    <div className="flex flex-col gap-[48px] w-full max-w-[1280px] p-[24px] mx-auto dark:bg-[#141926] bg-[#edeeef] border dark:border-[#FFFFFF0D] border-[#E9EAEC] rounded-[80px]">
      <QuestionsCarousel
        currentIndex={currentQuestionIndex}
        handleNext={() => {
          if (currentQuestionIndex < subcategory.exams.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
          }
        }}
        handlePrevious={() => {
          if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
          }
        }}
        questions={subcategory.exams.map((e, index) => ({
          id: e.id,
          order: index + 1,
          correct: e.examAnswer ? e.examAnswer.correct : null,
          currentIndex: index,
          isCurrent: e.id === subcategory.exams[currentQuestionIndex].id,
          onClick: () => {
            setCurrentQuestionIndex(index);
          },
        }))}
      />
      <div className="flex self-start">
        <QuestionText
          question={subcategory.exams[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
        />
      </div>
      <div className={`flex gap-4 flex-col xl:flex-row w-full`}>
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
          onQuestionAnswered={({ correct }) => {
            onQuestionAnswered();
            setCurrentQuestionStatus(correct ? "correct" : "incorrect");
          }}
        />
      </div>
      {showAnswer && currentQuestionStatus && (
        <div className="self-start w-full">
          <QuestionFeedback correct={currentQuestionStatus === "correct"} />
        </div>
      )}

      {showAnswer &&
        subcategory.exams[currentQuestionIndex].learnMoreVideoUrl && (
          <div className="self-start w-full">
            <QuestionVideo question={subcategory.exams[currentQuestionIndex]} />
          </div>
        )}

      {showAnswer && subcategory.exams[currentQuestionIndex].learnMore && (
        <div className="self-start w-full">
          <QuestionExplanation
            question={subcategory.exams[currentQuestionIndex]}
          />
        </div>
      )}
    </div>
  );
};

export default SubcategoryAnswerPage;
