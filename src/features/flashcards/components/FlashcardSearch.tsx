"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useMemo, useState } from "react";

import SearchInput from "@/components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { flashcardService } from "@/services/flashcardService";
import { FlashcardQuestionType } from "@/types/flashcardType";

import FlashcardSearchItem from "./FlashcardSearchItem";

const FlashcardSearch = () => {
  const { selectedProduct } = useSelectedProduct();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: flashcards, isPending } = useQuery<FlashcardQuestionType[]>({
    queryKey: ["flashcards-search", debouncedSearchQuery, selectedProduct],
    queryFn: async () => {
      if (debouncedSearchQuery.length < 3) {
        return [];
      }
      const response = await flashcardService.searchFlashcards({
        search: debouncedSearchQuery,
        product_id: selectedProduct?.id,
      });
      return response;
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

    if (debouncedSearchQuery.length < 3) {
      return (
        <div className="flex items-center justify-center">
          Digite pelo menos 3 caracteres para buscar
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
            searchQuery={debouncedSearchQuery}
            key={flashcard.id}
            flashcard={flashcard}
          />
        ))}
      </div>
    );
  }, [isPending, flashcards, debouncedSearchQuery]);

  return (
    <div className="flex flex-col gap-4">
      <SearchInput
        placeholder="Busque por um flashcard"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mt-4">{content}</div>
    </div>
  );
};

export default FlashcardSearch;
