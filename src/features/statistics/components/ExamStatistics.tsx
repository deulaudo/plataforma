import { twMerge } from "tailwind-merge";

import DualProgressRing from "@/components/DualProgressRing";
import ProgressBar from "@/components/ProgressBar";

type ExamStatisticsProps = {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  module: "STUDY" | "TEST";
};

const ExamStatistics = ({
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  module,
}: ExamStatisticsProps) => {
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
            Modo {module === "STUDY" ? "Estudo" : "Prova"}
          </span>
          <span className="text-[12px] dark:text-[#FFFFFF80] text-[#000000BF]">
            Dados e estatísticas
          </span>
        </div>
      </div>

      <div className="flex gap-10 mt-6 items-center justify-between">
        <DualProgressRing
          p1={(correctAnswers / totalQuestions) * 100}
          p2={(wrongAnswers / totalQuestions) * 100}
          size={149}
          thickness={16}
        >
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium text-[12px] dark:text-[#FFFFFF80] text-[#000000BF]">
              Questões
            </span>
            <span className="text-[24px] font-bold dark:text-white text-black">
              {totalQuestions}
            </span>
          </div>
        </DualProgressRing>

        <div className="flex flex-col gap-4 w-full max-w-[248px]">
          <div className="flex justify-between">
            <span className="font-bold text-[12px]">Questões certas</span>
            <span className="font-medium dark:text-[#FFFFFF80] text-[#000000BF] text-[12px]">
              {correctAnswers} de {totalQuestions}
            </span>
          </div>
          <ProgressBar
            segments={[
              {
                value: (correctAnswers / totalQuestions) * 100,
                color: "#1CD475",
              },
            ]}
            height={16}
          />
          <div className="flex justify-between">
            <span className="font-bold text-[12px]">Questões erradas</span>
            <span className="font-medium dark:text-[#FFFFFF80] text-[#000000BF] text-[12px]">
              {wrongAnswers} de {totalQuestions}
            </span>
          </div>
          <ProgressBar
            segments={[
              {
                value: (wrongAnswers / totalQuestions) * 100,
                color: "#FF3D00",
              },
            ]}
            height={16}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamStatistics;
