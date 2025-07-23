"use client";

import { useQuery } from "@tanstack/react-query";

import PageLayout from "@/components/PageLayout";
import StudyModeCategory from "@/features/study-mode/components/StudyModeCategory";
import { examService } from "@/services/examService";

const StudyModePage = () => {
  const { data: categories } = useQuery({
    queryKey: ["studyModeCategories"],
    queryFn: async () =>
      examService.listExamCategories({
        module: "STUDY",
      }),
  });

  return (
    <PageLayout headerType="back" headerTitle="Modo Estudo">
      <div className="flex flex-col gap-[24px]">
        {categories?.map((category) => (
          <StudyModeCategory
            id={category.id}
            name={category.name}
            subcategoriesCount={category.subcategoriesCount}
            subcategoriesDone={category.subcategoryDone}
            key={category.id}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default StudyModePage;
