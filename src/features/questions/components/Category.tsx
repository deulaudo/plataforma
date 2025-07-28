import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

import SegmentedProgressCircle from "@/components/SegmentedProgressCircle";
import { examService } from "@/services/examService";
import { ExamMode } from "@/types/examType";

import SubcategoryCard from "./SubcategoryCard";

type CategoryProps = {
  id: string;
  name: string;
  subcategoriesCount: number;
  subcategoriesDone: number;
  mode?: ExamMode;
};

const Category = ({
  id,
  name,
  subcategoriesCount,
  subcategoriesDone,
}: CategoryProps) => {
  const { theme } = useTheme();
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<boolean>(false);

  const { data: subcategories, isPending: isPendingSubcategories } = useQuery({
    queryKey: ["studyModeSubcategories", { categoryId: id }],
    queryFn: async () => {
      return (await examService.getExamCategoryById(id)).subcategories;
    },
  });

  return (
    <div className="flex w-[487px] h-fit flex-shrink-0 flex-col py-[24px] px-[16px] dark:bg-[#0F1420] bg-[#F5F5F5] rounded-[36px] border border-[#FFFFFF0D] self-start">
      <div className="flex gap-3 items-center">
        <SegmentedProgressCircle
          segments={subcategoriesCount}
          progress={subcategoriesDone}
          activeColor="#346fff"
          inactiveColor={theme === "dark" ? "#2a2a2a" : "#dcdee5"}
          textColor={theme === "dark" ? "#ffffff" : "#000000"}
          size={64}
          strokeWidth={5}
        />

        <div className="flex flex-1 flex-col gap-1">
          <span className="font-bold text-[16px] dark:text-white">{name}</span>
          <span className="font-bold text-[12px] text-[#2056F2]">
            {subcategoriesCount} provas
          </span>
        </div>

        {isCategoryExpanded ? (
          <ChevronUp
            className="dark:text-[#4b505d] text-[#7c7d80] cursor-pointer"
            onClick={() => setIsCategoryExpanded(false)}
          />
        ) : (
          <ChevronDown
            className="dark:text-[#4b505d] text-[#7c7d80] cursor-pointer"
            onClick={() => setIsCategoryExpanded(true)}
          />
        )}
      </div>

      {isCategoryExpanded && (
        <div className="flex flex-col mt-[16px]">
          {subcategories?.map((subcategory) => (
            <div
              key={subcategory.id}
              className="not-last:border-b dark:border-[#1c212d] border-[#EDEEEF] pt-2"
            >
              <SubcategoryCard
                key={subcategory.id}
                id={subcategory.id}
                name={subcategory.name}
                questionsCount={subcategory.questionsCount}
                questionsAnswered={subcategory.questionsAnswered}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
