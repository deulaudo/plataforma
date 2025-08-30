import { CardSim } from "lucide-react";
import { twMerge } from "tailwind-merge";

type FlashcardsStatisticsProps = {
  totalFlashcardsStudied?: number;
};

const FlashcardsStatistics = ({
  totalFlashcardsStudied,
}: FlashcardsStatisticsProps) => {
  return (
    <div
      className={twMerge(
        "dark:bg-[#141926] bg-[#e4e8ef]",
        "border border-[#0000000D] dark:border-[#FFFFFF0D]",
        "rounded-[64px] p-[24px]",
      )}
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-[20px] dark:text-white text-black">
            Flashcards Estudados
          </span>
          <span className="text-[12px] dark:text-[#FFFFFF80] text-[#000000BF]">
            Dados e estatísticas
          </span>
        </div>

        <div className="flex mt-6 items-center gap-4">
          <CardSim size={64} className="text-[#2056F2]" />
          <div className="flex flex-col items-end">
            <span className="font-bold text-[32px] dark:text-white text-black">
              {totalFlashcardsStudied || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsStatistics;
