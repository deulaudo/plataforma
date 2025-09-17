"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use } from "react";

import PageLayout from "@/components/PageLayout";
import CustomStudyAnswer from "@/features/custom-study/components/CustomStudyAnswer";
import SubcategoryAnswerPage from "@/features/questions/components/SubcategoryAnswerPage";
import { customStudyService } from "@/services/customStudyService";
import { examService } from "@/services/examService";

const CustomStudyAnswerPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

  const {
    data: customStudy,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["customStudy", id],
    queryFn: async () => customStudyService.getCustomStudyById(id),
  });

  if (isPending) {
    return (
      <PageLayout headerType="back" headerTitle="Modo Estudo">
        <Loader className="animate-spin" />
      </PageLayout>
    );
  }

  if (!customStudy) {
    return (
      <PageLayout headerType="back" headerTitle="Modo Estudo">
        <div className="flex justify-center items-center h-full">
          <p>Prova não encontrada.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout headerType="back" headerTitle={customStudy.name}>
      <CustomStudyAnswer
        customStudy={customStudy}
        onQuestionAnswered={() => {
          refetch();
        }}
      />
    </PageLayout>
  );
};

export default CustomStudyAnswerPage;
