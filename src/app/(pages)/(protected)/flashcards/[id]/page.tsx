"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use } from "react";

import PageLayout from "@/components/PageLayout";
import Flashcard from "@/features/flashcards/components/Flashcard";
import { flashcardService } from "@/services/flashcardService";

const FlashcardPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const {
    data: flashcard,
    isPending: isLoadingFlashcard,
    refetch,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["flashcard", { id }],
    queryFn: async () => {
      return await flashcardService.getFlashcardById(id);
    },
  });

  const onFlashcardFeedback = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    await refetch();
  };

  if (isLoadingFlashcard) {
    return (
      <PageLayout headerType="back" headerTitle="Deck">
        <Loader className="animate-spin" />
      </PageLayout>
    );
  }

  if (!flashcard) {
    return (
      <PageLayout headerType="back" headerTitle="Deck">
        Flashcard não encontrado
      </PageLayout>
    );
  }

  return (
    <PageLayout headerType="back" headerTitle={"Flashcard"}>
      <div className="flex flex-col gap-4 w-full max-w-[496px] mx-auto">
        <Flashcard flashcard={flashcard} onFeedback={onFlashcardFeedback} />
      </div>
    </PageLayout>
  );
};

export default FlashcardPage;
