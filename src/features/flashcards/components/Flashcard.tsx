"use client";

/* eslint-disable @next/next/no-img-element */
import { useMutation } from "@tanstack/react-query";
import { Frown, Loader, Meh, Smile, X } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { flashcardService } from "@/services/flashcardService";
import { FlashcardQuestionType } from "@/types/flashcardType";

type FlashcardProps = {
  flashcard: FlashcardQuestionType;
  onFeedback: () => void;
};

const Flashcard = ({ flashcard, onFeedback }: FlashcardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const evaluateFlashcadMutation = useMutation<
    void,
    unknown,
    { feedback: "EASY" | "MEDIUM" | "HARD" | "SUSPEND" }
  >({
    mutationFn: async ({ feedback }) => {
      if (feedback === "SUSPEND") {
        await flashcardService.changeDiscardedStatus(flashcard.id, true);
      } else {
        await flashcardService.evaluateFlashcard(flashcard.id, feedback);
      }
    },
    onSuccess: onFeedback,
  });

  useEffect(() => {
    setShowAnswer(false);
  }, [flashcard]);

  return (
    <div
      className={twMerge(
        "w-full rounded-[24px] p-[24px]",
        "min-h-[616px]",
        "relative",
        "perspective-[1000px]",
      )}
    >
      <div
        className={twMerge(
          "w-full h-full rounded-[24px] p-[24px] bg-[#eff3ff] dark:bg-[#101930] border dark:border-[#FFFFFF0D]",
          "flex flex-col gap-4",
          "min-h-[616px]",
          "relative",
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: showAnswer ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >
        {/* Front Face */}
        <div
          className="absolute p-[24px] inset-0 flex flex-col gap-4"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-bold dark:text-white text-black text-xs">
            Frente / Pergunta
          </span>

          <span
            className="text-[16px] dark:text-white text-black font-medium"
            dangerouslySetInnerHTML={{
              __html: flashcard.question.replace(/\n/g, "<br />"),
            }}
          />

          {flashcard.imageUrl && (
            <div className="flex justify-center">
              <ImageViewer
                imageUrl={flashcard.imageUrl}
                altText="Flashcard Image"
                className="max-h-[330px] max-w-[320px] object-contain"
              />
            </div>
          )}

          <div className="flex flex-col gap-4 flex-1 items-center justify-end">
            <Button fullWidth theme="blue" onClick={() => setShowAnswer(true)}>
              Ver resposta
            </Button>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute p-[24px] inset-0 flex flex-col gap-4"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="font-bold dark:text-white text-black text-xs">
            Verso / Resposta
          </span>

          <span
            className="text-[16px] dark:text-white text-black font-medium"
            dangerouslySetInnerHTML={{
              __html: flashcard.answer.answer.replace(/\n/g, "<br />"),
            }}
          />

          {flashcard.answer.imageUrl && (
            <div className="flex justify-center">
              <ImageViewer
                imageUrl={flashcard.answer.imageUrl}
                altText="Flashcard Answer Image"
                className="max-h-[330px] max-w-[320px] object-contain"
              />
            </div>
          )}

          <div className="flex flex-col gap-4 flex-1 items-center justify-end">
            <Button fullWidth theme="blue" onClick={() => setShowAnswer(false)}>
              Ver pergunta
            </Button>

            <div className="flex gap-4">
              <FlashcardLevelButton
                level="easy"
                onClick={() =>
                  evaluateFlashcadMutation.mutate({ feedback: "EASY" })
                }
              />
              <FlashcardLevelButton
                level="medium"
                onClick={() =>
                  evaluateFlashcadMutation.mutate({ feedback: "MEDIUM" })
                }
              />
              <FlashcardLevelButton
                level="hard"
                onClick={() =>
                  evaluateFlashcadMutation.mutate({ feedback: "HARD" })
                }
              />
              <FlashcardLevelButton
                level="suspend"
                onClick={() =>
                  evaluateFlashcadMutation.mutate({ feedback: "SUSPEND" })
                }
              />
            </div>
          </div>
        </div>

        {evaluateFlashcadMutation.isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 rounded-[24px]">
            <Loader className="animate-spin text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

const FlashcardLevelButton = ({
  level,
  onClick,
}: {
  level: "easy" | "medium" | "hard" | "suspend";
  onClick: () => void;
}) => {
  const colors = {
    easy: "dark:bg-[#182031] bg-[white]",
    medium: "dark:bg-[#182031] bg-[white]",
    hard: "dark:bg-[#182031] bg-[white]",
    suspend: "dark:bg-[#3a1f27] bg-[#f8c8c5]",
  };

  const icons = {
    easy: () => <Smile className="text-[#1ed475]" size={24} />,
    medium: () => <Meh className="text-[#e7bd16]" size={24} />,
    hard: () => <Frown className="text-[#e8493e]" size={24} />,
    suspend: () => <X className="text-[#e8493e]" size={24} />,
  };

  const texts = {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
    suspend: "Suspender",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        onClick={onClick}
        className={twMerge(
          "flex items-center justify-center w-[48px] h-[48px] rounded-[20px] dark:bg-[#182031] bg-[#182031]",
          "cursor-pointer",
          "hover:border-2",
          colors[level],
        )}
      >
        {icons[level]()}
      </div>
      <span className="text-xs dark:text-white text-black font-medium">
        {texts[level]}
      </span>
    </div>
  );
};

export default Flashcard;
