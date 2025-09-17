"use client";

import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import PageLayout from "@/components/PageLayout";
import CustomStudyList from "@/features/custom-study/components/CustomStudyList";

const CustomStudyPage = () => {
  const router = useRouter();
  return (
    <PageLayout headerTitle={"Estudo Personalizado"} headerType="back">
      <div className="flex flex-col">
        <div className="flex justify-end mb-[48px]">
          <Button onClick={() => router.push("/custom-study/create")}>
            <Plus size={16} className="mr-2" />
            Novo Estudo
          </Button>
        </div>
      </div>
      <CustomStudyList />
    </PageLayout>
  );
};

export default CustomStudyPage;
