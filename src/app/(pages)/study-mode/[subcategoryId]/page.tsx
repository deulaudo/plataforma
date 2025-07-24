"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";

import PageLayout from "@/components/PageLayout";
import withAuth from "@/hocs/withAuth";
import { examService } from "@/services/examService";

const StudyModeExecutionPage = ({
  params,
}: {
  params: Promise<{ subcategoryId: string }>;
}) => {
  const { subcategoryId } = use(params);

  const { data: subcategory, isPending } = useQuery({
    queryKey: ["studyMode", { subcategoryId }],
    queryFn: async () => examService.getExamSubcategoryById(subcategoryId),
  });

  return (
    <PageLayout
      headerType="back"
      headerTitle={subcategory?.name || "Modo Estudo"}
    >
      hello world
    </PageLayout>
  );
};

export default withAuth(StudyModeExecutionPage);
