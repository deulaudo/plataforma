import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";

import SearchInput from "@/components/SearchInput";

import FlashcardCategory from "./FlashcardCategory";

const FlashcardCategoryList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: categories, isPending } = useQuery({
    queryKey: ["flashcards-categories"],
    queryFn: async () => {
      const { flashcardService } = await import("@/services/flashcardService");
      return flashcardService.listFlashcardCategories();
    },
  });

  const filteredCategories = (categories || []).filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isPending) {
    return <Loader className="animate-spin" size={24} />;
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex items-center justify-center">
        Nenhuma categoria encontrada
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchInput
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquise por categorias"
      />

      <div className="flex justify-between gap-[24px] flex-wrap">
        {filteredCategories.map((category) => (
          <FlashcardCategory
            id={category.id}
            key={category.id}
            name={category.name}
            subcategoriesCount={category.subcategoriesCount}
            subcategoriesDone={category.subcategoryDone}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashcardCategoryList;
