import {
  FlashcardCategoryType,
  FlashcardDeckType,
  FlashcardQuestionType,
} from "@/types/flashcardType";

import api from "./api";

type FlashcardCategoryListItemType = FlashcardCategoryType & {
  subcategories: {
    id: string;
    name: string;
    active: boolean;
    questionsCount: number;
  };
};

async function listFlashcardCategories(): Promise<
  FlashcardCategoryListItemType[]
> {
  const response = await api.get<FlashcardCategoryListItemType[]>("category");
  return response.data;
}

async function getFlashcardCategoryById(
  id: string,
): Promise<FlashcardCategoryType> {
  const response = await api.get<FlashcardCategoryType>(`category/${id}`);
  return response.data;
}

async function getFlashcardDeckById(id: string): Promise<FlashcardDeckType> {
  const response = await api.get<FlashcardDeckType>(
    `category/subcategory/${id}`,
  );
  return response.data;
}

async function changeDiscardedStatus(
  flashcardId: string,
  discarded: boolean,
): Promise<void> {
  await api.post(`question/${flashcardId}/discard-retrieve`, {
    discarted: discarded,
  });
}

async function evaluateFlashcard(
  flashcardId: string,
  feedback: "EASY" | "MEDIUM" | "HARD",
): Promise<void> {
  await api.post(`question/${flashcardId}/feedback`, { feedback });
}

async function restartDeck(deckId: string): Promise<void> {
  await api.post(`category/subcategory/${deckId}/reset-history`);
}

async function searchFlashcards(
  query: string,
  discarted: boolean = false,
): Promise<FlashcardQuestionType[]> {
  let params = {};
  if (discarted) {
    params = { discarted: "true" };
  }

  const response = await api.get<{ questions: FlashcardQuestionType[] }>(
    `question?search=${encodeURIComponent(query)}`,
    {
      params,
    },
  );

  return response.data.questions;
}

export const flashcardService = {
  listFlashcardCategories,
  getFlashcardCategoryById,
  getFlashcardDeckById,
  evaluateFlashcard,
  changeDiscardedStatus,
  restartDeck,
  searchFlashcards,
};
