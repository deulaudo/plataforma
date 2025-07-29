import { ChevronRight, ListChecks } from "lucide-react";
import { useTheme } from "next-themes";

import { useRouter } from "next/navigation";

import ProgressBar from "@/components/ProgressBar";
import { ExamMode } from "@/types/examType";

type SubcategoryCardProps = {
  id: string;
  name: string;
  questionsCount: number;
  questionsAnswered: number;
  mode?: ExamMode;
};

const SubcategoryCard = ({
  id,
  name,
  questionsCount,
  questionsAnswered,
  mode = "STUDY",
}: SubcategoryCardProps) => {
  const router = useRouter();
  const { theme } = useTheme();

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
              />
              <span className="text-xs dark:text-white text-black font-bold">
                {questionsCount}
              </span>
            </div>
          </div>
        </div>

        <ProgressBar
          segments={[
            {
              color: "#e14a45",
              value: 20,
            },
            {
              color: "#46d07a",
              value: 10,
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
