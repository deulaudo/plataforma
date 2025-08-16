"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

import IconButton from "@/components/IconButton";
import PageLayout from "@/components/PageLayout";
import Tabs from "@/components/Tabs";
import FlashcardCategoryList from "@/features/flashcards/components/FlashcardCategoryList";
import FlashcardDiscartedList from "@/features/flashcards/components/FlashcardDiscartedList";
import FlashcardSearch from "@/features/flashcards/components/FlashcardSearch";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <PageLayout headerTitle="Flashcards" headerType="back">
      <div className="flex flex-col gap-[36px]">
        <div
        onClick={() => router.push("/flashcards/reviews")}
        className={twMerge(
          "cursor-pointer w-fit flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg p-2",
          "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
          "justify-center self-end",
        )}>
          <Calendar className="text-gray-500" size={20} />
          <span className="text-gray-500 text-sm">Revisões agendadas</span>
        </div>
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
