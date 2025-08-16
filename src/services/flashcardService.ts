import {
  FlashcardCategoryType,
  FlashcardDeckType,
  FlashcardQuestionType,
  FlashcardReviewType,
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

async function getFlashcardById(id: string): Promise<FlashcardQuestionType> {
  const response = await api.get<FlashcardQuestionType>(`question/${id}`);
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

async function scheduleDeckReview(deckId: string): Promise<void> {
  await api.post(`schedule-reviews`, {
    subcategoryId: deckId,
  });
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

async function getFlashcardReviews(): Promise<{[data: string]: FlashcardReviewType[]}> {
  const response = await api.get<{[data: string]: FlashcardReviewType[]}>(
    `schedule-reviews`,
  );

  return response.data;
}

async function resetFlashcardReview(hashId: string): Promise<void> {
  await api.delete(`schedule-reviews/${hashId}`);
}

export const flashcardService = {
  listFlashcardCategories,
  getFlashcardCategoryById,
  getFlashcardDeckById,
  getFlashcardById,
  evaluateFlashcard,
  changeDiscardedStatus,
  restartDeck,
  searchFlashcards,
  scheduleDeckReview,
  getFlashcardReviews,
  resetFlashcardReview,
};
