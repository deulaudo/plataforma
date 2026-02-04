"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, ChevronUp, Loader } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { tagService } from "@/services/tagService";
import { TagType } from "@/types/tagType";

type TagSelectorProps = {
  courseMode: boolean;
  moduleId?: string;
  value: string[];
  onTagChange: (tagIds: string[]) => void;
  label?: string;
  placeholder?: string;
  className?: string;
};

const TagSelector = ({
  courseMode,
  moduleId,
  value,
  onTagChange,
  label = "Filtrar por tags",
  placeholder = "Selecione as tags",
  className,
}: TagSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedProduct } = useSelectedProduct();

  const { data: tags, isPending } = useQuery({
    queryKey: ["tags", selectedProduct?.id, courseMode],
    queryFn: () =>
      tagService.listTags({
        productId: selectedProduct?.id || "",
        courseMode: courseMode || false,
        moduleId: moduleId || undefined,
      }),
    enabled: !!selectedProduct?.id,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabels = useMemo(() => {
    if (!tags || value.length === 0) return null;
    return value
      .map((id) => tags.find((t: TagType) => t.id === id)?.tag)
      .filter(Boolean) as string[];
  }, [tags, value]);

  const triggerLabel = useMemo(() => {
    if (!selectedLabels || selectedLabels.length === 0) return placeholder;
    if (selectedLabels.length === 1) return selectedLabels[0];
    return `${selectedLabels.length} tags selecionadas`;
  }, [selectedLabels, placeholder]);

  const toggleTag = (tagId: string) => {
    const next = value.includes(tagId)
      ? value.filter((id) => id !== tagId)
      : [...value, tagId];
    onTagChange(next);
  };

  const clearSelection = () => {
    onTagChange([]);
  };

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div
      className={twMerge("flex flex-col gap-2 w-full max-w-[280px]", className)}
      ref={containerRef}
    >
      <label className="font-bold text-sm text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={twMerge(
            "flex items-center justify-between w-full min-h-[48px] py-2 px-[16px] rounded-[20px]",
            "border-2 dark:border-[#FFFFFF0D] border-[#0000000D]",
            "dark:bg-[#182031] bg-[#0000000D]",
            "cursor-pointer transition-all duration-200",
            "hover:border-[#2056F2]",
            isOpen && "border-[#2056F2]",
          )}
        >
          <span
            className={twMerge(
              "text-[14px] truncate flex-1",
              selectedLabels && selectedLabels.length > 0
                ? "dark:text-white text-black"
                : "dark:text-[#FFFFFF40] text-[#00000080]",
            )}
          >
            {triggerLabel}
          </span>
          {isPending ? (
            <Loader
              className="animate-spin dark:text-[#FFFFFF40] text-[#00000080] shrink-0"
              size={16}
            />
          ) : isOpen ? (
            <ChevronUp
              className="dark:text-[#FFFFFF40] text-[#00000080] shrink-0"
              size={16}
            />
          ) : (
            <ChevronDown
              className="dark:text-[#FFFFFF40] text-[#00000080] shrink-0"
              size={16}
            />
          )}
        </div>
        {isOpen && !isPending && (
          <div
            className={twMerge(
              "absolute top-full left-0 w-full max-h-[240px] overflow-y-auto mt-1 rounded-[20px] p-[8px]",
              "border dark:border-[#FFFFFF0D] border-[#0000000D]",
              "dark:bg-[#182031] bg-white shadow-lg z-50",
            )}
          >
            <div
              onClick={clearSelection}
              className={twMerge(
                "p-[12px] rounded-[16px] cursor-pointer transition-all duration-200 flex items-center gap-2",
                "hover:dark:bg-[#FFFFFF0D] hover:bg-[#F5F5F5]",
                value.length === 0 &&
                  "ring-1 ring-[#2056F2] dark:ring-[#2056F2]",
              )}
            >
              <span className="text-[14px] dark:text-white text-black">
                Todas as tags
              </span>
            </div>
            {tags.map((tag: TagType) => {
              const isSelected = value.includes(tag.id);
              return (
                <div
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={twMerge(
                    "p-[12px] rounded-[16px] cursor-pointer transition-all duration-200 flex items-center gap-2",
                    "hover:dark:bg-[#FFFFFF0D] hover:bg-[#F5F5F5]",
                    isSelected && "ring-1 ring-[#2056F2] dark:ring-[#2056F2]",
                  )}
                >
                  {isSelected ? (
                    <Check
                      className="shrink-0 text-[#2056F2]"
                      size={18}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <span className="w-[18px] shrink-0" />
                  )}
                  <span className="font-medium text-[14px] dark:text-white text-black">
                    {tag.tag}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSelector;
