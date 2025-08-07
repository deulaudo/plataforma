import { CreditCard, Frown, Meh, Smile } from "lucide-react";
import { useTheme } from "next-themes";

import ProgressBar from "@/components/ProgressBar";
import { FlashcardDeckType } from "@/types/flashcardType";

type FlashcardDeckProgressProps = {
  deck: FlashcardDeckType;
};

const FlashcardDeckProgress = ({ deck }: FlashcardDeckProgressProps) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex gap-1 items-center">
          <CreditCard size={16} className="text-[#4b4f58]" />
          <span className="text-[12px] text-bold dark:text-white text-black">
            {deck.totalQuestions}
          </span>
        </div>

        <div className="flex gap-1 items-center">
          <Meh size={16} className="text-[#4b4f58]" />
          <span className="text-[12px] text-bold dark:text-white text-black">
            {deck.totalQuestions}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Smile className="dark:text-[#1ed475] text-[#1ed475]" size={16} />
          <span className="text-xs dark:text-white text-black font-bold">
            {deck.totalEasy}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Meh className="dark:text-[#e7bd16] text-[#e7bd16]" size={16} />
          <span className="text-xs dark:text-white text-black font-bold">
            {deck.totalMedium}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Frown className="dark:text-[#e8493e] text-[#e8493e]" size={16} />
          <span className="text-xs dark:text-white text-black font-bold">
            {deck.totalHard}
          </span>
        </div>
      </div>
      <ProgressBar
        segments={[
          {
            color: "#E8493F",
            value: deck.totalHard,
          },
          {
            color: "#E7BD15",
            value: deck.totalMedium,
          },
          {
            color: "#1CD475",
            value: deck.totalEasy,
          },
          {
            color: theme === "dark" ? "#2a334a" : "#ccd0d4",
            value: 100,
          },
        ]}
      />
    </div>
  );
};

export default FlashcardDeckProgress;
