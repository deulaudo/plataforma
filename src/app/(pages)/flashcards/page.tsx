"use client";

import { useState } from "react";

import PageLayout from "@/components/PageLayout";
import Tabs from "@/components/Tabs";
import FlashcardCategoryList from "@/features/flashcards/components/FlashcardCategoryList";
import FlashcardDiscartedList from "@/features/flashcards/components/FlashcardDiscartedList";
import FlashcardSearch from "@/features/flashcards/components/FlashcardSearch";

const tabs = [
  {
    id: "categories",
    label: "Categorias",
    content: <FlashcardCategoryList />,
  },
  {
    id: "terms",
    label: "Busca por termo",
    content: <FlashcardSearch />,
  },
  {
    id: "suspended",
    label: "Suspensos",
    content: <FlashcardDiscartedList />,
  },
];

const FlashcardsPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("categories");

  return (
    <PageLayout headerTitle="Flashcards" headerType="back">
      <div className="flex flex-col gap-[36px]">
        <Tabs
          activeTabId={currentTab}
          tabs={tabs}
          onTabChange={(tabId) => setCurrentTab(tabId)}
        />
      </div>
    </PageLayout>
  );
};

export default FlashcardsPage;
