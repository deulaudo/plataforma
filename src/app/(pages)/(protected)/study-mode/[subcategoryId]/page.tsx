"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use } from "react";

import PageLayout from "@/components/PageLayout";
import SubcategoryPage from "@/features/questions/components/SubcategoryPage";
import QuestionsCarousel from "@/features/study-mode/components/QuestionsCarousel";
import withAuth from "@/hocs/withAuth";
import { examService } from "@/services/examService";

const StudyModeExecutionPage = ({
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

  return (
    <PageLayout
      headerType="back"
      headerTitle={subcategory?.name || "Modo Estudo"}
    >
      {isPending ? (
        <Loader className="animate-spin" />
      ) : (
        subcategory && (
          <SubcategoryPage
            mode="STUDY"
            subcategory={subcategory}
            onReset={() => {
              refetch();
            }}
          />
        )
      )}
    </PageLayout>
  );
};

export default withAuth(StudyModeExecutionPage);
