"use client";

import PageLayout from "@/components/PageLayout";
import CategoryList from "@/features/questions/components/CategoryList";

const TestModePage = () => {
  return (
    <PageLayout headerType="back" headerTitle="Modo Prova">
      <CategoryList mode="TEST" />
    </PageLayout>
  );
};

export default TestModePage;
