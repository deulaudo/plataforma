"use client";

import { ChevronRight, CircleCheck, ListCheck } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { useRouter } from "next/navigation";

import ProgressBar from "@/components/ProgressBar";

type TestHistoryProps = {
  data: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    } | null;
    questionsAnswered: number;
    questionsCount: number;
  }[];
};

const TestHistory = ({ data }: TestHistoryProps) => {
  const router = useRouter();
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
            Provas realizadas
          </span>
          <span className="text-[12px] dark:text-[#FFFFFF80] text-[#000000BF]">
            Dados e estatísticas
          </span>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {data.map((test) => (
            <div
              className="flex items-center justify-between gap-4"
              key={test.id}
            >
              <div key={test.id} className="flex flex-col flex-1 gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-[16px] font-extrabold">
                    {test.category?.name} - {test.name}
                  </span>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <ListCheck
                          size={16}
                          strokeWidth={3}
                          className="text-[#747578] dark:text-[#505461]"
                        />
                        <span className="text-[12px] font-bold">
                          {test.questionsCount}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <CircleCheck
                          size={16}
                          strokeWidth={3}
                          className="text-[#747578] dark:text-[#505461]"
                        />
                        <span className="text-[12px] font-bold">
                          {test.questionsAnswered}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <ProgressBar
                  segments={[
                    {
                      value:
                        (test.questionsAnswered / test.questionsCount) * 100,
                      color: "#1CD475",
                    },
                  ]}
                  height={8}
                />
              </div>

              <ChevronRight
                size={24}
                className="text-[#747578] dark:text-[#505461] cursor-pointer"
                onClick={() => {
                  router.push(`test-mode/${test.id}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestHistory;
