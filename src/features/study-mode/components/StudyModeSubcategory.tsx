"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CircleCheck,
  CircleX,
  ListCheck,
  Loader,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useState } from "react";

import IconButton from "@/components/IconButton";
import ProgressBar from "@/components/ProgressBar";
import { examService } from "@/services/examService";

import StudyQuestionCard from "./StudyQuestionCard";

type StudyModeSubcategoryProps = {
  id: string;
  name: string;
  questionsCount: number;
  questionsAnswered: number;
};

const StudyModeSubcategory = ({
  id,
  name,
  questionsCount,
  questionsAnswered,
}: StudyModeSubcategoryProps) => {
  const [isSubcategoryExpanded, setIsSubcategoryExpanded] =
    useState<boolean>(false);
  const { data: subcategory, isPending } = useQuery({
    queryKey: ["studyMode", { subcategoryId: id }],
    queryFn: async () => examService.getExamSubcategoryById(id),
    enabled: isSubcategoryExpanded,
  });

  const correctQuestionsPercentage = subcategory
    ? Math.round(
        (subcategory.correctQuestions / subcategory.questionsCount) * 100,
      )
    : 0;

  const wrongQuestionsPercentage = subcategory
    ? Math.round(
        (subcategory.wrongQuestions / subcategory.questionsCount) * 100,
      )
    : 0;

  return (
    <div className="flex flex-col hover:bg-[#0055EE1A] rounded-[20px]">
      <div className="flex flex-col gap-2">
        <div className="flex gap-[16px] items-center">
          <h3 className="font-extrabold text-xl dark:text-white p-6">{name}</h3>
          |
          <div className="flex flex-col gap-2">
            <div className="flex gap-[16px] items-center">
              <div className="flex items-center gap-2">
                <ListCheck size={16} />
                <span className="text-xs">
                  Questões no total: <strong>{questionsCount}</strong>
                </span>
              </div>
              {subcategory && (
                <div className="flex items-center gap-2">
                  <CircleCheck size={16} />
                  <span className="text-xs">
                    Questões pendentes:{" "}
                    <strong>
                      {subcategory.questionsCount -
                        subcategory.questionsAnswered}
                    </strong>
                  </span>
                </div>
              )}
              {subcategory && (
                <div className="flex items-center gap-2">
                  <CircleCheck className="text-[#45cd7c]" size={16} />
                  <span className="text-xs">
                    Questões certas:{" "}
                    <strong>{subcategory.correctQuestions}</strong>
                  </span>
                </div>
              )}
              {subcategory && (
                <div className="flex items-center gap-2">
                  <CircleX className="text-[#dd4b4a]" size={16} />
                  <span className="text-xs">
                    Questões erradas:{" "}
                    <strong>{subcategory.wrongQuestions}</strong>
                  </span>
                </div>
              )}
            </div>

            {subcategory && (
              <ProgressBar
                segments={[
                  {
                    color: "#46d07a",
                    value: correctQuestionsPercentage,
                  },
                  {
                    color: "#e14a45",
                    value: wrongQuestionsPercentage,
                  },
                  {
                    color: "#293451",
                    value: 100,
                  },
                ]}
              />
            )}
          </div>
          <div className="flex justify-end flex-1">
            <IconButton
              icon={isSubcategoryExpanded ? <Minimize2 /> : <Maximize2 />}
              onClick={() => setIsSubcategoryExpanded(!isSubcategoryExpanded)}
            />
          </div>
        </div>
      </div>

      {isSubcategoryExpanded && (
        <div className="p-6">
          {isPending ? (
            <div className="text-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <div className="flex gap-[24px] flex-wrap">
              {subcategory?.exams.map((exam, index) => (
                <StudyQuestionCard
                  key={exam.id}
                  id={exam.id}
                  order={index + 1}
                  question={exam.question}
                  examAnswer={exam.examAnswer}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyModeSubcategory;
