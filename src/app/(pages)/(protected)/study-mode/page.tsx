"use client";

import PageLayout from "@/components/PageLayout";
import CategoryList from "@/features/questions/components/CategoryList";

const StudyModePage = () => {
  return (
    <PageLayout headerType="back" headerTitle="Modo Estudo">
      <CategoryList mode="STUDY" />
    </PageLayout>
  );
};

export default StudyModePage;
