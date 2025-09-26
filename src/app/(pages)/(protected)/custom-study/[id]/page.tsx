"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use } from "react";

import { useRouter } from "next/navigation";

import PageLayout from "@/components/PageLayout";
import CustomStudyQuestions from "@/features/custom-study/components/CustomStudyQuestions";
import { customStudyService } from "@/services/customStudyService";

const CustomStudy = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();

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
      <CustomStudyQuestions
        customStudy={customStudy!}
        onReset={refetch}
        onDelete={() => {
          router.replace("/custom-study");
        }}
      />
    </PageLayout>
  );
};

export default CustomStudy;
