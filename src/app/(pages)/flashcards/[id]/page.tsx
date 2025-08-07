"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use, useEffect, useState } from "react";

import PageLayout from "@/components/PageLayout";
import Flashcard from "@/features/flashcards/components/Flashcard";
import FlashcardDeckProgress from "@/features/flashcards/components/FlashcardDeckProgress";
import { flashcardService } from "@/services/flashcardService";
import { useFlashcardStore } from "@/stores/flashcardStore";

const FlashcardDeckPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { setDeck } = useFlashcardStore();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState<number>(0);

  const { data: deck, isPending: isLoadingDeck } = useQuery({
    queryKey: ["flashcardDeck", { id }],
    queryFn: async () => {
      return await flashcardService.getFlashcardDeckById(id);
    },
  });

  useEffect(() => {
    setDeck(deck || null);
  }, [deck, setDeck]);

  if (!deck && isLoadingDeck) {
    return (
      <PageLayout headerType="back" headerTitle="Deck">
        <Loader className="animate-spin" />
      </PageLayout>
    );
  }

  return (
    <PageLayout headerType="back" headerTitle={deck?.name || "Deck"}>
      <div className="flex flex-col gap-4 w-full max-w-[496px] mx-auto">
        <FlashcardDeckProgress deck={deck!} />

        <Flashcard flashcard={deck!.questions[currentFlashcardIndex]} />
      </div>
    </PageLayout>
  );
};

export default FlashcardDeckPage;
