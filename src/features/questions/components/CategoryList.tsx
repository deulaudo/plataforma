import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { examService } from "@/services/examService";
import { ExamMode } from "@/types/examType";

import Category from "./Category";

type CategoryListProps = {
  mode?: ExamMode;
};

const CategoryList = ({ mode = "STUDY" }: CategoryListProps) => {
  const { data: categories, isPending: isPendingCategories } = useQuery({
    queryKey: ["examCategories", { mode }],
    queryFn: async () => {
      return await examService.listExamCategories({
        module: mode,
      });
    },
  });

  return (
    <div className="flex gap-[24px] justify-between flex-wrap">
      {isPendingCategories ? (
        <Loader className="animate-spin" />
      ) : (
        categories?.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            subcategoriesCount={category.subcategoriesCount}
            subcategoriesDone={category.subcategoryDone}
            mode={mode}
          />
        ))
      )}
    </div>
  );
};

export default CategoryList;
