import { ChevronLeft, ChevronRight, CircleCheck, XCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

import IconButton from "@/components/IconButton";

type Question = {
  id: string;
  order: number;
  correct: boolean | null;
  isCurrent: boolean;
  onClick: () => void;
};

type QuestionsCarouselProps = {
  questions: Question[];
  onQuestionChange?: (questionId: string) => void;
  currentIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
};

const QuestionsCarousel = ({
  questions,
  currentIndex,
  handleNext,
  handlePrevious,
}: QuestionsCarouselProps) => {
  return (
    <div className="relative w-full justify-between md:justify-center md:w-[500px] lg:w-[650px] self-center xl:w-[1200px] 2xl:w-full flex items-center gap-4 px-4">
      <IconButton icon={<ChevronLeft size={20} />} onClick={handlePrevious} />

      <div className="hidden md:flex relative items-center overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (164 + 12)}px)`, // 164px (card width) + 12px (gap-3)
          }}
        >
          {questions.map((question) => (
            <div
              key={question.id}
              onClick={question.onClick}
              className={twMerge(
                "cursor-pointer",
                "flex items-center gap-2",
                "w-[174px] h-[68px]",
                "p-[24px] rounded-[24px]",
                "dark:bg-[#0f1729] bg-[#eaedf2] border border-[#0000000D]",
                question.correct !== null
                  ? question.correct
                    ? "dark:bg-[#111d24]  bg-[#f7fdfb]"
                    : "dark:bg-[#191623] bg-[#fef6f6]"
                  : "",
                question.isCurrent && "border-2 border-[#2056F2]",
              )}
            >
              {question.correct !== false ? (
                <CircleCheck
                  size={16}
                  className={
                    question.correct ? "text-[#46d475]" : "text-[#4b505e]"
                  }
                />
              ) : (
                <XCircle size={16} className="text-[#e74a41]" />
              )}
              <span className="text-[16px] font-bold dark:text-white">
                Questão {question.order}
              </span>
            </div>
          ))}
        </div>
      </div>

      <IconButton icon={<ChevronRight size={20} />} onClick={handleNext} />
    </div>
  );
};

export default QuestionsCarousel;
