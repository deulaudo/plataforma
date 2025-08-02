import { FlashcardCategoryType } from "@/types/flashcardType";

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

export const flashcardService = {
  listFlashcardCategories,
  getFlashcardCategoryById,
};
