import { ChevronRight, CircleCheck, CircleX, ListChecks } from "lucide-react";
import { useTheme } from "next-themes";

import { useRouter } from "next/navigation";

import ProgressBar from "@/components/ProgressBar";
import { ExamMode } from "@/types/examType";

type SubcategoryCardProps = {
  id: string;
  name: string;
  questionsCount: number;
  questionsAnswered: number;
  correctQuestions: number;
  wrongQuestions: number;
  mode?: ExamMode;
};

const SubcategoryCard = ({
  id,
  name,
  questionsCount,
  questionsAnswered,
  correctQuestions,
  wrongQuestions,
  mode = "STUDY",
}: SubcategoryCardProps) => {
  const router = useRouter();
  const { theme } = useTheme();

  const correctPercentage =
    questionsAnswered > 0 ? (correctQuestions / questionsAnswered) * 100 : 0;
  const wrongPercentage =
    questionsAnswered > 0 ? (wrongQuestions / questionsAnswered) * 100 : 0;

  return (
    <div className="flex items-center">
      <div className="flex flex-1 gap-2 flex-col p-[16px]">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-[16px] dark:text-white text-black">
            {name}
          </h3>

          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <ListChecks
                className="dark:text-[#4c515e] text-[#808080]"
                size={16}
                strokeWidth={3}
              />
              <span className="text-xs dark:text-white text-black font-bold">
                {questionsCount}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck
                className="dark:text-[#4c515e] text-[#808080]"
                size={16}
                strokeWidth={3}
              />
              <span className="text-xs dark:text-white text-black font-bold">
                {questionsCount - questionsAnswered}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck
                className="text-[#1cce7c]"
                size={16}
                strokeWidth={3}
              />
              <span className="text-xs dark:text-white text-black font-bold">
                {correctQuestions}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CircleX className="text-[#dd4b4a]" size={16} strokeWidth={3} />
              <span className="text-xs dark:text-white text-black font-bold">
                {wrongQuestions}
              </span>
            </div>
          </div>
        </div>

        <ProgressBar
          segments={[
            {
              color: "#e14a45",
              value: wrongPercentage,
            },
            {
              color: "#46d07a",
              value: correctPercentage,
            },
            {
              color: theme === "dark" ? "#2a334a" : "#ccd0d4",
              value: 100,
            },
          ]}
        />
      </div>

      <ChevronRight
        size={24}
        className="text-[#808080] dark:text-[#4c515e] cursor-pointer"
        onClick={() => {
          router.push(`/${mode === "STUDY" ? "study" : "test"}-mode/${id}`);
        }}
      />
    </div>
  );
};

export default SubcategoryCard;
