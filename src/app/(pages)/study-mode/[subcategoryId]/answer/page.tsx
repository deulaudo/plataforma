"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use } from "react";

import PageLayout from "@/components/PageLayout";
import SubcategoryAnswerPage from "@/features/questions/components/SubcategoryAnswerPage";
import { examService } from "@/services/examService";

const StudyModeAnswerPage = ({
  params,
}: {
  params: Promise<{ subcategoryId: string }>;
}) => {
  const { subcategoryId } = use(params);

  const {
    data: subcategory,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["studyMode", { subcategoryId }],
    queryFn: async () =>
      examService.getExamSubcategoryById({
        id: subcategoryId,
        mode: "STUDY",
      }),
  });

  if (isPending) {
    return (
      <PageLayout headerType="back" headerTitle="Modo Estudo">
        <Loader className="animate-spin" />
      </PageLayout>
    );
  }

  if (!subcategory) {
    return (
      <PageLayout headerType="back" headerTitle="Modo Estudo">
        <div className="flex justify-center items-center h-full">
          <p>Prova não encontrada.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout headerType="back" headerTitle={subcategory.name}>
      <SubcategoryAnswerPage
        subcategory={subcategory}
        mode="STUDY"
        onQuestionAnswered={() => {
          refetch();
        }}
      />
    </PageLayout>
  );
};

export default StudyModeAnswerPage;
