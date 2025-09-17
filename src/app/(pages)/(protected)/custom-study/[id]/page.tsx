"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use } from "react";

import PageLayout from "@/components/PageLayout";
import CustomStudyPage from "@/features/custom-study/components/CustomStudyPage";
import { customStudyService } from "@/services/customStudyService";

const CustomStudy = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const {
    data: customStudy,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["customStudy", id],
    queryFn: async () => {
      return await customStudyService.getCustomStudyById(id);
    },
  });

  if (isPending && !customStudy) {
    return (
      <PageLayout headerType="back" headerTitle={"Estudo Personalizado"}>
        <Loader className="animate-spin text-[#3B82F6]" size={30} />
      </PageLayout>
    );
  }

  return (
    <PageLayout headerType="back" headerTitle={"Estudo Personalizado"}>
      <CustomStudyPage customStudy={customStudy!} onReset={refetch} />
    </PageLayout>
  );
};

export default CustomStudy;
