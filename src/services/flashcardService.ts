import {
  FlashcardCategoryType,
  FlashcardDeckType,
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

export const flashcardService = {
  listFlashcardCategories,
  getFlashcardCategoryById,
  getFlashcardDeckById,
  evaluateFlashcard,
  changeDiscardedStatus,
};
