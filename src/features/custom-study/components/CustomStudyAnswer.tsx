"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import ImageViewer from "@/components/ImageViewer";
import Tabs from "@/components/Tabs";
import CommentsBox from "@/features/comments/CommentsBox";
import { CustomStudyType } from "@/types/customStudyType";
import { ExamMode } from "@/types/examType";

import QuestionAlternatives from "./QuestionAlternatives";
import QuestionExplanation from "./QuestionExplanation";
import QuestionFeedback from "./QuestionFeedback";
import QuestionText from "./QuestionText";
import QuestionVideo from "./QuestionVideo";
import QuestionsCarousel from "./QuestionsCarousel";

type CustomStudyAnswerProps = {
  customStudy: CustomStudyType;
  onQuestionAnswered: () => void;
};

const CustomStudyAnswer = ({
  customStudy,
  onQuestionAnswered,
}: CustomStudyAnswerProps) => {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState<string>("explanation");
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
      const questionIndex = customStudy.exams.findIndex(
        (exam) => exam.id === questionId,
      );

      if (questionIndex !== -1) {
        setCurrentQuestionIndex(questionIndex);
        setLoadedQuestionFromURL(true);
      } else {
        // Se não encontrar a questão, mantém o índice 0 e marca como carregado
        setLoadedQuestionFromURL(true);
      }
    } else {
      // Se não há questionId nos params, marca como carregado
      setLoadedQuestionFromURL(true);
    }
  }, [loadedQuestionFromURL, searchParams, customStudy.exams]);

  /** Define estado da questão atual */
  useEffect(() => {
    const question = customStudy.exams[currentQuestionIndex];
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
  }, [currentQuestionIndex, customStudy.exams]);

  const showAnswer = useMemo(() => {
    return currentQuestionStatus !== null;
  }, [currentQuestionStatus]);

  return (
    <div className="flex flex-col gap-[48px] w-full max-w-[1280px] p-[24px] mx-auto dark:bg-[#141926] bg-[#edeeef] border dark:border-[#FFFFFF0D] border-[#E9EAEC] rounded-[80px]">
      <QuestionsCarousel
        currentIndex={currentQuestionIndex}
        handleNext={() => {
          if (currentQuestionIndex < customStudy.exams.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
          }
        }}
        handlePrevious={() => {
          if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
          }
        }}
        questions={customStudy.exams.map((e, index) => ({
          id: e.id,
          order: index + 1,
          correct: e.examAnswer ? e.examAnswer.correct : null,
          currentIndex: index,
          cancelled: e.cancelled,
          answered: e.examAnswer !== null,
          isCurrent: e.id === customStudy.exams[currentQuestionIndex].id,
          onClick: () => {
            setCurrentQuestionIndex(index);
          },
        }))}
      />
      <div className="flex self-start">
        <QuestionText
          question={customStudy.exams[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
        />
      </div>
      <div
        className={`flex gap-4 flex-col xl:flex-row w-full ${customStudy.exams[currentQuestionIndex].imageUrl ? "lg:justify-between items-center" : "items-center md:justify-end"}`}
      >
        {customStudy.exams[currentQuestionIndex].imageUrl && (
          <div className="flex-1">
            <ImageViewer
              imageUrl={customStudy.exams[currentQuestionIndex].imageUrl}
              altText="Question illustration"
              className="rounded-2xl max-h-[400px]"
            />
          </div>
        )}
        <QuestionAlternatives
          customStudyId={customStudy.id}
          question={customStudy.exams[currentQuestionIndex]}
          onQuestionAnswered={({ correct }) => {
            onQuestionAnswered();

            setCurrentQuestionStatus(correct ? "correct" : "incorrect");
          }}
        />
      </div>
      {showAnswer && currentQuestionStatus && (
        <div className="self-start w-full">
          <QuestionFeedback
            cancelled={customStudy.exams[currentQuestionIndex].cancelled}
            correct={currentQuestionStatus === "correct"}
          />
        </div>
      )}

      {showAnswer && (
        <Tabs
          activeTabId={currentTab}
          onTabChange={(tabId: string) => setCurrentTab(tabId)}
          tabs={[
            {
              id: "explanation",
              label: "Explicação",
              content: (
                <div className="flex flex-col gap-8">
                  {showAnswer &&
                    customStudy.exams[currentQuestionIndex].learnMore && (
                      <div className="self-start w-full">
                        <QuestionExplanation
                          question={customStudy.exams[currentQuestionIndex]}
                        />
                      </div>
                    )}
                </div>
              ),
            },
            {
              id: "comments",
              label: "Comentários",
              content: (
                <CommentsBox
                  referenceType="QUESTION"
                  referenceId={customStudy.exams[currentQuestionIndex].id}
                />
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default CustomStudyAnswer;
