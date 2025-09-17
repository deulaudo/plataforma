"use client";

import PageLayout from "@/components/PageLayout";
import CustomStudyList from "@/features/custom-study/components/CustomStudyList";

const CustomStudyPage = () => {
  return (
    <PageLayout headerTitle={"Estudo Personalizado"} headerType="back">
      <CustomStudyList />
    </PageLayout>
  );
};

export default CustomStudyPage;
