import { useMutation } from "@tanstack/react-query";
import { CircleCheck, ListChecks, XCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import ProgressBar from "@/components/ProgressBar";
import { examService } from "@/services/examService";
import { ExamMode, ExamSubcategory } from "@/types/examType";

import ConfirmFinishTest from "./ConfirmFinishTest";
import ConfirmSubcategoryReset from "./ConfirmSubcategoryReset";
import QuestionCard from "./QuestionCard";

type SubcategoryPageProps = {
  subcategory: ExamSubcategory;
  mode?: ExamMode;
  onReset?: () => void;
};

const SubcategoryPage = ({
  subcategory,
  mode = "STUDY",
  onReset,
}: SubcategoryPageProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isFinishTestModalOpen, setIsFinishTestModalOpen] =
    useState<boolean>(false);
  const isTestFinished =
    localStorage.getItem(`test:${subcategory.id}`) === "true";

  const correctQuestionsPercentage = useMemo(() => {
    if (mode === "TEST" && !isTestFinished) {
      return 0;
    }
    return Math.round(
      (subcategory.correctQuestions / subcategory.questionsCount) * 100,
    );
  }, [
    isTestFinished,
    mode,
    subcategory.questionsCount,
    subcategory.correctQuestions,
  ]);

  const wrongQuestionsPercentage = useMemo(() => {
    if (mode === "TEST" && !isTestFinished) {
      return 0;
    }
    return Math.round(
      (subcategory.wrongQuestions / subcategory.questionsCount) * 100,
    );
  }, [
    isTestFinished,
    mode,
    subcategory.questionsCount,
    subcategory.wrongQuestions,
  ]);

  const correctQuestionsCount = useMemo(() => {
    if (mode === "TEST" && !isTestFinished) {
      return 0;
    }
    return subcategory.correctQuestions;
  }, [isTestFinished, mode, subcategory.correctQuestions]);

  const wrongQuestionsCount = useMemo(() => {
    if (mode === "TEST" && !isTestFinished) {
      return 0;
    }
    return subcategory.wrongQuestions;
  }, [isTestFinished, mode, subcategory.wrongQuestions]);

  const resetSubcategoryMutation = useMutation({
    mutationFn: async () => {
      return await examService.resetExamSubcategory(subcategory.id, mode);
    },
    onSuccess: () => {
      if (onReset) {
        onReset();
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 dark:bg-[#151b2b] bg-[#e5e8ef] p-[24px] rounded-[36px] border dark:border-[#FFFFFF0D] border-[#E9EAEC]">
      <div className="flex flex-col xl:flex-row gap-[24px] xl:items-center">
        <h1 className="font-extrabold text-[24px] dark:text-white text-black">
          {subcategory.name}
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
                Total de questões: <b>{subcategory.questionsCount}</b>
              </span>
            </div>

            {/** Questões pendentes */}
            <div className="flex gap-2 items-center">
              <CircleCheck
                className="dark:text-[#4c515e] text-[#808080]"
                size={16}
              />
              <span className="text-xs dark:text-white text-black">
                Questões pendentes:{" "}
                <b>
                  {subcategory.questionsCount - subcategory.questionsAnswered}
                </b>
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
              loading={resetSubcategoryMutation.isPending}
              onClick={() => {
                setIsResetModalOpen(true);
              }}
              theme="blue"
            >
              Reiniciar prova
            </Button>

            {mode === "TEST" && (
              <Button
                loading={resetSubcategoryMutation.isPending}
                onClick={() => {
                  setIsFinishTestModalOpen(true);
                }}
              >
                Finalizar prova
              </Button>
            )}
          </div>
        </div>

        <ConfirmSubcategoryReset
          isOpen={isResetModalOpen}
          onClose={() => {
            setIsResetModalOpen(false);
          }}
          onConfirm={() => {
            resetSubcategoryMutation.mutate();
            setIsResetModalOpen(false);

            if (mode === "TEST") {
              localStorage.removeItem(`test:${subcategory.id}`);
            }
          }}
        />

        <ConfirmFinishTest
          isOpen={isFinishTestModalOpen}
          onClose={() => {
            setIsFinishTestModalOpen(false);
          }}
          onConfirm={() => {
            localStorage.setItem(`test:${subcategory.id}`, "true");
            setIsFinishTestModalOpen(false);
          }}
        />
      </div>

      <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
        {subcategory.exams.map((question, index) => (
          <QuestionCard
            mode={mode as "STUDY" | "TEST"}
            key={question.id}
            subcategoryId={subcategory.id}
            order={index + 1}
            question={question.question}
            id={question.id}
            examAnswer={question.examAnswer}
            onClick={() => {
              if (mode === "STUDY") {
                router.push(
                  `/study-mode/${subcategory.id}/answer?questionId=${question.id}`,
                );
              } else {
                router.push(
                  `/test-mode/${subcategory.id}/answer?questionId=${question.id}`,
                );
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SubcategoryPage;
