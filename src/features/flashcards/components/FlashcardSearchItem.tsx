"use client";

import { XCircle } from "lucide-react";

import { useRouter } from "next/navigation";

import { FlashcardQuestionType } from "@/types/flashcardType";

type FlashcardSearchItemProps = {
  flashcard: FlashcardQuestionType;
  searchQuery?: string;
  discarted?: boolean;
};

const FlashcardSearchItem = ({
  flashcard,
  searchQuery,
  discarted = false,
}: FlashcardSearchItemProps) => {
  const router = useRouter();

  const highlightTextInHTML = (htmlText: string, query?: string) => {
    if (!query || !query.trim()) {
      return htmlText;
    }

    // Escapa caracteres especiais da regex
    const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Cria uma regex que não substitui dentro de tags HTML
    const regex = new RegExp(`(?![^<]*>)(${escapedQuery})(?![^<]*>)`, "gi");

    // Substitui o texto encontrado por uma versão destacada
    return htmlText.replace(
      regex,
      '<span class="text-red-500 font-semibold">$1</span>',
    );
  };

  const processedQuestion = highlightTextInHTML(
    flashcard.question,
    searchQuery,
  );

  return (
    <div
      onClick={() => {
        router.push(
          `/flashcards/${flashcard.subcategory.id}?flashcardId=${flashcard.id}`,
        );
      }}
      className="p-4 border cursor-pointer dark:border-[#FFFFFF0D] border-[#0000000D] rounded-[36px] hover:dark:bg-[#151b2b] hover:bg-[#f5f7ff] transition"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-bold dark:text-white">
            {flashcard.subcategory.name}
          </span>
          {discarted && <XCircle className="text-[#de4a48]" size={16} />}
        </div>
        <div
          className="text-sm mt-2 dark:text-white text-black"
          dangerouslySetInnerHTML={{
            __html: processedQuestion.replace(/\n/g, "<br />"),
          }}
        />
      </div>
    </div>
  );
};

export default FlashcardSearchItem;
