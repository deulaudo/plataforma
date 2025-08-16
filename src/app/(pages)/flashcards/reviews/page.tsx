"use client";

import Calendar from "@/components/Calendar";
import PageLayout from "@/components/PageLayout";
import FlashcardReviewCard from "@/features/flashcards/components/FlashcardReviewCard";
import LateFlashcardReviewModal from "@/features/flashcards/components/LateFlashcardReviewModal";
import { flashcardService } from "@/services/flashcardService";
import { FlashcardReviewType } from "@/types/flashcardType";
import { useQuery } from "@tanstack/react-query";
import { isBefore, toDate } from "date-fns";
import { Clipboard, Loader } from "lucide-react";
import { useMemo, useState } from "react";

const FlashcardReviewsPage = () => {
  const [showLateReviewModal, setShowLateReviewModal] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<FlashcardReviewType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const { data: reviews, isPending } = useQuery({
    queryKey: ["flashcardReviews"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return await flashcardService.getFlashcardReviews();
    },
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const highlightedDates = useMemo(() => {
    if (!reviews) return [];

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return Object.entries(reviews).map(([dateString, reviewsArray]) => {
      const reviewDate = new Date(`${dateString}T00:00:00`);

      if (reviewDate >= currentDate) {
        return {
          date: reviewDate,
          color: "blue" as const,
        };
      }

      const allReviewsDone = reviewsArray.every((review) => review.done === true);
      if (allReviewsDone) {
        return {
          date: reviewDate,
          color: "green" as const,
        };
      }

      return {
        date: reviewDate,
        color: "red" as const,
      };
    });
  }, [reviews]);

  const onReviewClick = (review: FlashcardReviewType) => {
    setSelectedReview(review);
    const reviewDate = toDate(review.revisionDate);
    if (isBefore(reviewDate, new Date()) && !review.done) {
      setShowLateReviewModal(true);
    }
  }

  const content = useMemo(() => {
    if (isPending) {
      return (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" size={24} />
        </div>
      );
    }

    let selectedDateReviews = [] as FlashcardReviewType[];
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      selectedDateReviews = reviews?.[dateKey] || [];
    }

    if (selectedDateReviews.length === 0) {
      return (
        <div className="flex flex-col gap-2 items-center justify-center">
          <Clipboard className="w-8 h-8 text-gray-500" />
          <span className="text-sm max-w-[250px] text-center">Até o momento, não há nada para revisitar neste dia!</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full justify-center items-center gap-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {selectedDateReviews.map((review) => (
          <FlashcardReviewCard
            key={review.id}
            onClick={() => onReviewClick(review)}
            review={review}
          />
        ))}
      </div>
    )
  }, [isPending, selectedDate, reviews]);

  return (
    <PageLayout headerTitle="Revisões de Flashcards" headerType="back">
      <div className="flex flex-col md:items-center gap-[24px] md:gap-0 md:flex-row justify-between items-center">
        <Calendar
          highlightedDates={highlightedDates}
          onDateClick={handleDateClick}
        />

        <div className="flex justify-center w-full">
         {content}
        </div>

        {showLateReviewModal && selectedReview && (
          <LateFlashcardReviewModal
            review={selectedReview}
            onClose={() => {
              setShowLateReviewModal(false);
              setSelectedReview(null);
            }}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default FlashcardReviewsPage;