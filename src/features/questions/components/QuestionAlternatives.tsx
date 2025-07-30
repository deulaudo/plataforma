"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button";
import { examService } from "@/services/examService";
import { ExamMode, ExamSubcategoryQuestion } from "@/types/examType";

type QuestionAlternativesProps = {
  question: ExamSubcategoryQuestion;
  mode?: ExamMode;
  onQuestionAnswered: (data: {
    alternativeId: string;
    correct: boolean;
  }) => void;
};

const QuestionAlternatives = ({
  question,
  mode,
  onQuestionAnswered,
}: QuestionAlternativesProps) => {
  const [selectedAlternative, setSelectedAlternative] = useState<string>(
    question.examAnswer?.alternativeId || "",
  );
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(
    question.examAnswer !== null,
  );

  useEffect(() => {
    setSelectedAlternative(question.examAnswer?.alternativeId || "");
    setAnswerSubmitted(question.examAnswer !== null);
  }, [question.examAnswer]);

  const showAnswer = useMemo(() => {
    if (mode === "STUDY") {
      return answerSubmitted && selectedAlternative;
    }
    return false;
  }, [mode, answerSubmitted, selectedAlternative]);

  const answerQuestionMutation = useMutation({
    mutationFn: async () => {
      if (!selectedAlternative) return;

      await examService.answerQuestion({
        questionId: question.id,
        alternativeId: selectedAlternative,
        mode: mode === "STUDY" ? "STUDY" : "TEST",
      });
    },
    onSuccess: () => {
      setAnswerSubmitted(true);
      onQuestionAnswered({
        alternativeId: selectedAlternative!,
        correct: question.alternatives.some(
          (alt) => alt.id === selectedAlternative && alt.correct,
        ),
      });
    },
  });

  const getAlternativeStyle = useCallback(
    (alternativeId: string) => {
      if (showAnswer) {
        if (mode === "STUDY") {
          if (selectedAlternative === alternativeId) {
            if (
              question.alternatives.find((alt) => alt.correct)?.id ===
              alternativeId
            ) {
              return "border-2 border-[#1CD475] text-[#1CD475]";
            }
            return "border-2 border-[#E8493F] text-[#E8493F]";
          }
        }
      }
    },
    [showAnswer, mode, selectedAlternative, question.alternatives],
  );

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
              getAlternativeStyle(alternative.id),
            )}
            onClick={() => {
              setSelectedAlternative(alternative.id);
              setAnswerSubmitted(false);
            }}
          >
            {alternative.text}
          </div>
        ))}
      </div>

      <Button
        loading={answerQuestionMutation.isPending}
        onClick={() => answerQuestionMutation.mutate()}
        theme="blue"
      >
        Confirmar
      </Button>
    </div>
  );
};

export default QuestionAlternatives;
