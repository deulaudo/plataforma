"use client";

import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  CreditCard,
  Frown,
  Meh,
  Smile,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

import { useRouter } from "next/navigation";

import ProgressBar from "@/components/ProgressBar";
import { FlashcardCardSubcategoryType } from "@/types/flashcardType";
import { twMerge } from "tailwind-merge";

type FlashcardSubcategoryCardProps = {
  subcategory: FlashcardCardSubcategoryType;
  isChildSubcategory?: boolean;
};

const FlashcardSubcategoryCard = ({
  subcategory,
  isChildSubcategory = false,
}: FlashcardSubcategoryCardProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isSubcategoryExpanded, setIsSubcategoryExpanded] =
    useState<boolean>(false);

  if (subcategory.subcategoriesChildsCount === 0) {
    return (
      <div className="flex items-center">
        <div className="flex flex-1 gap-4 flex-col p-[16px]">
          <h3 className={twMerge(
            "font-extrabold text-[16px] dark:text-white text-black",
            isChildSubcategory ? "text-[14px]" : ""
          )}>
            {subcategory.name}{" "}
            {subcategory.questionsCount > 0 &&
              subcategory.questionsCount === subcategory.questionsDone && (
                <CircleCheck
                  strokeWidth={3}
                  className="text-[#1ed475] inline-block ml-1"
                  size={16}
                />
              )}
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <CreditCard
                  className="dark:text-[#4c515e] text-[#808080]"
                  size={16}
                />
                <span className="text-xs dark:text-white text-black font-bold">
                  {subcategory.questionsCount}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Meh className="dark:text-[#4c515e] text-[#808080]" size={16} />
                <span className="text-xs dark:text-white text-black font-bold">
                  {0}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Smile
                  className="dark:text-[#1ed475] text-[#1ed475]"
                  size={16}
                />
                <span className="text-xs dark:text-white text-black font-bold">
                  {0}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Meh className="dark:text-[#e7bd16] text-[#e7bd16]" size={16} />
                <span className="text-xs dark:text-white text-black font-bold">
                  {0}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Frown
                  className="dark:text-[#e8493e] text-[#e8493e]"
                  size={16}
                />
                <span className="text-xs dark:text-white text-black font-bold">
                  {0}
                </span>
              </div>
            </div>
          </div>

          <ProgressBar
            segments={[
              {
                color: "#e14a45",
                value: 20,
              },
              {
                color: "#46d07a",
                value: 10,
              },
              {
                color: theme === "dark" ? "#2a334a" : "#ccd0d4",
                value: 100,
              },
            ]}
          />
        </div>

        <ChevronRight
          size={24}
          className="text-[#808080] dark:text-[#4c515e] cursor-pointer"
          onClick={() => {
            router.push(`/flashcards/decks/${subcategory.id}`);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col gap-4 flex-1 p-[16px]">
        <div className="flex flex-1 items-center gap-2">
          <h3 className={
            twMerge(
              "font-extrabold text-[16px] dark:text-white text-black",
              isChildSubcategory ? "text-[14px]" : ""
            )}
          >
            {subcategory.name}
          </h3>

          <CreditCard
            className="dark:text-[#4c515e] text-[#808080] inline-block ml-1"
            size={16}
          />

          <div className="flex flex-1 justify-end">
            {isSubcategoryExpanded ? (
              <ChevronUp
                size={24}
                className="text-[#808080] dark:text-[#4c515e] cursor-pointer"
                onClick={() => setIsSubcategoryExpanded(false)}
              />
            ) : (
              <ChevronDown
                size={24}
                className="text-[#808080] dark:text-[#4c515e] cursor-pointer"
                onClick={() => setIsSubcategoryExpanded(true)}
              />
            )}
          </div>
        </div>

        {isSubcategoryExpanded && (
          <div className="flex flex-col gap-2">
            {subcategory.childSubcategories.map((childSubcategory) => (
              <FlashcardChildSubcategoryCard
                key={childSubcategory.id}
                subcategory={childSubcategory}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardSubcategoryCard;

const FlashcardChildSubcategoryCard = ({
  subcategory,
}: FlashcardSubcategoryCardProps) => {
  return <FlashcardSubcategoryCard isChildSubcategory subcategory={subcategory} />;
};
