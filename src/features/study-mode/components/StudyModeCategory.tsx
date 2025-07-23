"use client";

import { useQuery } from "@tanstack/react-query";
import { ListCheck, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

import IconButton from "@/components/IconButton";
import { examService } from "@/services/examService";

import StudyModeSubcategory from "./StudyModeSubcategory";

type StudyModeCategoryProps = {
  id: string;
  name: string;
  subcategoriesCount: number;
  subcategoriesDone: number;
};

const StudyModeCategory = ({
  id,
  name,
  subcategoriesCount,
  subcategoriesDone,
}: StudyModeCategoryProps) => {
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<boolean>(false);

  const { data: subcategories, isPending: isPendingSubcategories } = useQuery({
    queryKey: ["studyModeSubcategories", { categoryId: id }],
    queryFn: async () => {
      return (await examService.getExamCategoryById(id)).subcategories;
    },
  });

  return (
    <div className="flex flex-col pt-[24px] px-[24px] pb-[24px] dark:bg-[#141926] bg-[#EDEEEF] rounded-[36px]">
      <div className="flex items-center gap-[16px]">
        <h2 className="text-[20px] font-bold text-[#141926] dark:text-white">
          {name}
        </h2>
        |
        <div className="flex gap-2 items-center">
          <ListCheck />
          {subcategoriesDone} de {subcategoriesCount} concluídas
        </div>
        <div className="flex flex-1 justify-end">
          <IconButton
            icon={isCategoryExpanded ? <Minimize2 /> : <Maximize2 />}
            onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
          />
        </div>
      </div>
      {isCategoryExpanded && (
        <div className="w-full mt-[16px]">
          {subcategories?.map((subcategory) => (
            <StudyModeSubcategory key={subcategory.id} {...subcategory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyModeCategory;
