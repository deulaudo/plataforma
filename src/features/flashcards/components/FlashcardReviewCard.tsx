"use client";

import { FlashcardReviewType } from "@/types/flashcardType";

type FlashcardReviewCardProps = {
  review: FlashcardReviewType;
  onClick: () => void;
};

const FlashcardReviewCard = ({
  review,
  onClick,
}: FlashcardReviewCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full xl:w-[487px] h-fit flex-col py-[24px] px-[16px] dark:bg-[#111931] bg-[#eff3fe] rounded-[36px] border border-[#FFFFFF0D] cursor-pointer hover:bg-[#e0e7ff] dark:hover:bg-[#1f1f2a]">
      <span className="font-bold">{review.subcategory.name}</span>
      <div className="flex w-fit rounded-[16px] bg-[#2056f2] p-2 mt-2">
        <span className="text-xs text-white">Revisão {review.reviewCycle} de {review.subcategory.reviews}</span>
      </div>
    </div>
  );
};

export default FlashcardReviewCard;