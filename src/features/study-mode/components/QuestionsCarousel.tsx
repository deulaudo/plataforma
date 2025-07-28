import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import IconButton from "@/components/IconButton";
import { ExamSubcategory } from "@/types/examType";

type StudyModeSubcategoryQuestionsProps = {
  subcategory: ExamSubcategory;
};

type QuestionItemProps = {
  order: number;
  question: ExamSubcategory["exams"][number];
  onClick: () => void;
  isActive?: boolean;
};

const QuestionItem = ({
  order,
  question,
  onClick,
  isActive,
}: QuestionItemProps) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "flex items-center gap-2 rounded-[24px] p-[24px] w-[164px]",
        "dark:bg-[#0F1420] bg-[#FFFFFF]",
        "border dark:border-[#FFFFFF0D] border-[#0000000D]",
        isActive && "border-2 border-[#4256f2]",
      )}
    >
      <CircleCheck size={16} className="text-[#7b7c7f] dark:text-[#4b515f]" />
      <span className="font-bold text-[16px] dark:text-white text-black">
        Questão {order}
      </span>
    </div>
  );
};

const QuestionsCarousel = ({
  subcategory,
}: StudyModeSubcategoryQuestionsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 200; // Adjust this value to control scroll distance
    const currentScroll = scrollRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    scrollRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={scrollRef}
      className="flex items-center w-full gap-4 p-4 relative overflow-x-auto hide-scrollbar scroll-smooth"
    >
      <div className="absolute left-0 z-10">
        <IconButton
          icon={<ChevronLeft />}
          onClick={() => handleScroll("left")}
        />
      </div>
      <div
        className={`flex flex-1 px-[48px] overflow-x-auto scroll-smooth hide-scrollbar max-w-calc(100% - ${subcategory.exams.length * 164 + 96}px)`}
      >
        {subcategory.exams.map((exam, index) => (
          <QuestionItem
            key={exam.id}
            question={exam}
            order={index + 1}
            onClick={() => setActiveIndex(index)}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      <div className="absolute right-0 z-10">
        <IconButton
          icon={<ChevronRight />}
          onClick={() => handleScroll("right")}
        />
      </div>
    </div>
  );
};

export default QuestionsCarousel;
