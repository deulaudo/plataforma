"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use, useEffect, useMemo, useState } from "react";

import PageLayout from "@/components/PageLayout";
import DeckFinishedModal from "@/features/flashcards/components/DeckFinishedModal";
import Flashcard from "@/features/flashcards/components/Flashcard";
import FlashcardDeckProgress from "@/features/flashcards/components/FlashcardDeckProgress";
import { flashcardService } from "@/services/flashcardService";
import { FlashcardQuestionType } from "@/types/flashcardType";

const FlashcardDeckPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [showDeckCompletedModal, setShowDeckCompletedModal] =
    useState<boolean>(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState<number>(0);

  const {
    data: deck,
    isPending: isLoadingDeck,
    isLoading: isReloadingDeck,
    refetch,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["flashcardDeck", { id }],
    queryFn: async () => {
      const deck = await flashcardService.getFlashcardDeckById(id);
      if (deck.questions.length > 0) {
        const nextFlashcardIndex = currentFlashcardIndex + 1;
        if (nextFlashcardIndex < deck.questions.length) {
          setCurrentFlashcardIndex(nextFlashcardIndex);
        } else {
          setCurrentFlashcardIndex(0);
        }
      }

      return deck;
    },
  });

  const currentFlashcard = useMemo(() => {
    if (deck && deck.questions.length > 0) {
      return deck.questions[currentFlashcardIndex];
    }
    return null;
  }, [deck, currentFlashcardIndex]);

  useEffect(() => {
    if (deck && deck.questions.length === 0) {
      setShowDeckCompletedModal(true);
    } else {
      setShowDeckCompletedModal(false);
    }
  }, [deck]);

  const onFlashcardFeedback = async () => {
    refetch();
  };

  if (!deck && isLoadingDeck) {
    return (
      <PageLayout headerType="back" headerTitle="Deck">
        <Loader className="animate-spin" />
      </PageLayout>
    );
  }

  if (deck && deck.questions.length === 0 && isReloadingDeck) {
    return (
      <PageLayout headerType="back" headerTitle="Deck">
        <Loader className="animate-spin" />
      </PageLayout>
    );
  }

  return (
    <PageLayout headerType="back" headerTitle={deck?.name || "Deck"}>
      {showDeckCompletedModal ||
      deck?.questions.length === 0 ||
      !currentFlashcard ? (
        <DeckFinishedModal
          deckId={id}
          onRestart={refetch}
          isOpen={showDeckCompletedModal}
          hasReview={deck?.hasReview || false}
          onClose={() => {
            setShowDeckCompletedModal(false);
          }}
        />
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-[496px] mx-auto">
          <FlashcardDeckProgress deck={deck!} />
          <Flashcard
            flashcard={currentFlashcard!}
            onFeedback={onFlashcardFeedback}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default FlashcardDeckPage;
