"use client";

import { useMutation } from "@tanstack/react-query";
import { CircleCheck, ListChecks, Pen, Trash, XCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import ProgressBar from "@/components/ProgressBar";
import { customStudyService } from "@/services/customStudyService";
import { CustomStudyType } from "@/types/customStudyType";

import ConfirmDeleteCustomStudy from "./ConfirmDeleteCustomStudy";
import ConfirmResetCustomStudy from "./ConfirmResetCustomStudy";
import QuestionCard from "./QuestionCard";

type CustomStudyQuestionsProps = {
  customStudy: CustomStudyType;
  onReset?: () => void;
  onDelete?: () => void;
};

const CustomStudyQuestions = ({
  customStudy,
  onReset,
  onDelete,
}: CustomStudyQuestionsProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const questionsCount = customStudy.exams.length;
  const questionsAnswered = customStudy.exams.filter(
    (exam) => exam.examAnswer !== null,
  ).length;

  const correctQuestionsPercentage = useMemo(() => {
    if (!customStudy.exams || customStudy.exams.length === 0) {
      return 0;
    }

    const correctQuestions = customStudy.exams?.filter(
      (exam) => exam.examAnswer?.correct && !exam.cancelled,
    ).length;

    return Math.round((correctQuestions / questionsCount) * 100);
  }, [customStudy.exams, questionsCount]);

  const wrongQuestionsPercentage = useMemo(() => {
    if (!customStudy.exams || customStudy.exams.length === 0) {
      return 0;
    }

    const wrongQuestions = customStudy.exams?.filter(
      (exam) => exam.examAnswer && !exam.examAnswer.correct && !exam.cancelled,
    ).length;

    return Math.round((wrongQuestions / questionsCount) * 100);
  }, [customStudy.exams, questionsCount]);

  const correctQuestionsCount = useMemo(() => {
    if (!customStudy.exams || customStudy.exams.length === 0) {
      return 0;
    }

    const correctQuestions = customStudy.exams?.filter(
      (exam) => exam.examAnswer?.correct && !exam.cancelled,
    ).length;

    return correctQuestions;
  }, [customStudy.exams]);

  const wrongQuestionsCount = useMemo(() => {
    if (!customStudy.exams || customStudy.exams.length === 0) {
      return 0;
    }

    const wrongQuestions = customStudy.exams?.filter(
      (exam) => exam.examAnswer && !exam.examAnswer.correct && !exam.cancelled,
    ).length;

    return wrongQuestions;
  }, [customStudy.exams]);

  const resetCustomStudyMutation = useMutation({
    mutationFn: async () => {
      return await customStudyService.resetCustomStudyProgress(customStudy.id);
    },
    onSuccess: () => {
      if (onReset) {
        onReset();
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 dark:bg-[#151b2b] bg-[#e5e8ef] p-[24px] rounded-[36px] border dark:border-[#FFFFFF0D] border-[#E9EAEC]">
      <div className="flex justify-end gap-2">
        <IconButton
          icon={<Pen size={16} />}
          onClick={() => {
            router.push(`/custom-study/${customStudy.id}/edit`);
          }}
        />
        <IconButton
          icon={<Trash size={16} />}
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-[24px] xl:items-center">
        <h1 className="font-extrabold text-[24px] dark:text-white text-black">
          {customStudy.name}
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            {/** Total de questões */}
            <div className="flex gap-2 items-center">
              <ListChecks
                className="dark:text-[#4c515e] text-[#808080]"
                size={16}
              />
              <span className="text-xs dark:text-white text-black">
                Total de questões: <b>{questionsCount}</b>
              </span>
            </div>

            {/** Questões pendentes */}
            <div className="flex gap-2 items-center">
              <CircleCheck
                className="dark:text-[#4c515e] text-[#808080]"
                size={16}
              />
              <span className="text-xs dark:text-white text-black">
                Questões pendentes: <b>{questionsCount - questionsAnswered}</b>
              </span>
            </div>

            {/** Questões certas */}
            <div className="flex gap-2 items-center">
              <CircleCheck className="text-[#1cce7c]" size={16} />
              <span className="text-xs dark:text-white text-black">
                Questões corretas: <b>{correctQuestionsCount}</b>
              </span>
            </div>

            {/** Questões erradas */}
            <div className="flex gap-2 items-center">
              <XCircle className="text-[#de4a48]" size={16} />
              <span className="text-xs dark:text-white text-black">
                Questões erradas: <b>{wrongQuestionsCount}</b>
              </span>
            </div>
          </div>
          <ProgressBar
            segments={[
              {
                color: "#e14a45",
                value: wrongQuestionsPercentage,
              },
              {
                color: "#46d07a",
                value: correctQuestionsPercentage,
              },
              {
                color: theme === "dark" ? "#2a334a" : "#c5cbd5",
                value: 100,
              },
            ]}
          />

          <div className="flex gap-2 items-center mt-2">
            <Button
              loading={resetCustomStudyMutation.isPending}
              onClick={() => {
                setIsResetModalOpen(true);
              }}
              theme="blue"
            >
              Reiniciar prova
            </Button>
          </div>
        </div>

        <ConfirmResetCustomStudy
          isOpen={isResetModalOpen}
          onClose={() => {
            setIsResetModalOpen(false);
          }}
          onConfirm={() => {
            resetCustomStudyMutation.mutate();
            setIsResetModalOpen(false);
          }}
        />

        <ConfirmDeleteCustomStudy
          isOpen={isDeleteModalOpen}
          customStudyId={customStudy.id}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onConfirm={() => {
            if (onDelete) {
              onDelete();
            }
            setIsDeleteModalOpen(false);
          }}
        />
      </div>
      <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
        {customStudy.exams.map((question, index) => (
          <QuestionCard
            cancelled={question.cancelled}
            key={question.id}
            customStudyId={customStudy.id}
            order={index + 1}
            question={question.question}
            id={question.id}
            examAnswer={question.examAnswer}
            onClick={() => {
              router.push(
                `/custom-study/${customStudy.id}/answer?questionId=${question.id}`,
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomStudyQuestions;
