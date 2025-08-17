"use client";

import { useQuery } from "@tanstack/react-query";
import { CreditCard, ListCheck, Loader, Search } from "lucide-react";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useRouter } from "next/navigation";

import Input from "@/components/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { examService } from "@/services/examService";
import { flashcardService } from "@/services/flashcardService";

// Função helper para remover tags HTML do texto
const stripHtml = (html: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

// Função helper para destacar texto que coincide com a busca
const highlightSearchText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  // Remove HTML antes de aplicar o highlight
  const cleanText = stripHtml(text);

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = cleanText.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="text-blue-500 font-semibold">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const GlobalSearch = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: searchResponse, isPending } = useQuery({
    queryKey: ["globalSearch", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return { questions: [], flashcards: [] };
      const questionsResponsePromise = examService.searchQuestions({
        search: debouncedSearch,
      });
      const flashcardsResponsePromise = flashcardService.searchFlashcards({
        search: debouncedSearch,
      });

      const [questionsResponse, flashcardsResponse] = await Promise.all([
        questionsResponsePromise,
        flashcardsResponsePromise,
      ]);

      return {
        questions: questionsResponse,
        flashcards: flashcardsResponse,
      };
    },
  });

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        highlightWhenFocused
        icon={<Search size={16} />}
        placeholder="Pesquise por questões"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {isOpen && debouncedSearch && (
        <div
          className={twMerge(
            "absolute top-full left-0 w-full max-h-[500px] overflow-y-auto min-h-[200px] rounded-[36px] p-[24px]",
            "flex flex-col gap-[24px]",
            "z-10",
            // Dark Mode
            "dark:bg-[#141926] border border-[#FFFFFF0D]",
            // Light Mode
            "bg-[#EDEEEF] border border-[#E9EAEC]",
          )}
          onMouseDown={(e) => e.preventDefault()} // Previne o blur quando clica nos resultados
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin" size={24} />
            </div>
          ) : (
            <>
              <span className="font-bold text-[16px] dark:text-white text-black">
                Principais Resultados
              </span>

              {(searchResponse?.questions ?? []).length > 0 && (
                <SearchResultGroup
                  name="Questões"
                  icon={<ListCheck size={16} className="text-[#4f535c]" />}
                  searchTerm={debouncedSearch}
                  results={(searchResponse?.questions ?? []).map(
                    (question) => ({
                      id: question.id,
                      title: question.question,
                      description: question.tags
                        .map((tag) => tag.tag)
                        .join(" • "),
                      onResultItemClick: () => {
                        setIsOpen(false);
                        router.push(
                          `/study-mode/${question.subcategory.id}/answer?questionId=${question.id}`,
                        );
                      },
                    }),
                  )}
                />
              )}

              {(searchResponse?.flashcards ?? []).length > 0 && (
                <SearchResultGroup
                  name="Flashcards"
                  icon={<CreditCard size={16} className="text-[#4f535c]" />}
                  searchTerm={debouncedSearch}
                  results={(searchResponse?.flashcards ?? []).map(
                    (flashcard) => ({
                      id: flashcard.id,
                      title: flashcard.question,
                      description: flashcard.subcategory.name,
                      onResultItemClick: () => {
                        setIsOpen(false);
                        router.push(`/flashcards/${flashcard.id}`);
                      },
                    }),
                  )}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

type SearchResultGroupProps = {
  name: string;
  icon: React.ReactNode;
  searchTerm: string;
  results: {
    id: string;
    title: string;
    description: string;
    onResultItemClick: (id: string) => void;
  }[];
};

const SearchResultGroup = ({
  name,
  icon,
  searchTerm,
  results,
}: SearchResultGroupProps) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex gap-1 items-center">
        {icon}
        <span className="text-[12px] font-medium dark:text-[#FFFFFF80]">
          {name}
        </span>
        {results.length && (
          <div className="w-[16px] h-[16px] bg-[#2c303c] rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white">{results.length}</span>
          </div>
        )}
      </div>

      {results.map((result) => (
        <div
          className="flex flex-col gap-1 cursor-pointer dark:hover:bg-[#FFFFFF0D] hover:bg-[#F5F5F5] transition-opacity"
          key={result.id}
          onClick={() => result.onResultItemClick(result.id)}
        >
          <span className="text-[10px] dark:text-white italic">
            {highlightSearchText(result.title, searchTerm)}
          </span>
          <span className="text-[10px] dark:text-[#888c92] italic">
            {result.description}
          </span>
        </div>
      ))}
      <div className="flex flex-col gap-2"></div>
    </div>
  );
};

export default GlobalSearch;
