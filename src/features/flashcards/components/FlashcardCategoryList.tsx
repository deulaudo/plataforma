import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";

import SearchInput from "@/components/SearchInput";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";

import FlashcardCategory from "./FlashcardCategory";

const FlashcardCategoryList = () => {
  const { selectedProduct } = useSelectedProduct();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: categories, isPending } = useQuery({
    queryKey: ["flashcards-categories", { selectedProduct }],
    queryFn: async () => {
      const { flashcardService } = await import("@/services/flashcardService");
      const categories = await flashcardService.listFlashcardCategories({
        productId: selectedProduct?.id,
      });

      return categories.filter((category) => category.subcategoriesCount > 0);
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
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
