"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useMemo, useState } from "react";

import { flashcardService } from "@/services/flashcardService";
import { FlashcardQuestionType } from "@/types/flashcardType";

import FlashcardSearchItem from "./FlashcardSearchItem";

const FlashcardDiscartedList = () => {
  const {
    data: flashcards,
    isPending,
    refetch,
  } = useQuery<FlashcardQuestionType[]>({
    queryKey: ["flashcards-search", { discarted: true }],
    queryFn: async () => {
      return await flashcardService.searchFlashcards("", true);
    },
  });

  const content = useMemo(() => {
    if (isPending) {
      return (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" size={24} />
        </div>
      );
    }

    if (!flashcards || flashcards.length === 0) {
      return (
        <div className="flex items-center justify-center">
          Nenhum flashcard encontrado
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {flashcards.map((flashcard) => (
          <FlashcardSearchItem
            key={flashcard.id}
            flashcard={flashcard}
            discarted
            onRemoveDiscartedStatus={refetch}
          />
        ))}
      </div>
    );
  }, [isPending, flashcards, refetch]);

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4">{content}</div>
    </div>
  );
};

export default FlashcardDiscartedList;
