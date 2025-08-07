import { create } from "zustand";

import { FlashcardDeckType } from "@/types/flashcardType";

type FlashcardStoreType = {
  deck: FlashcardDeckType | null;
  setDeck: (deck: FlashcardDeckType | null) => void;
};

export const useFlashcardStore = create<FlashcardStoreType>((set) => ({
  deck: null,

  setDeck: (deck) => set({ deck }),
}));
