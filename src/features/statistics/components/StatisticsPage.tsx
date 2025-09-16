"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader, Zap } from "lucide-react";
import { Tooltip } from "react-tooltip";

import { statisticsService } from "@/services/statisticsService";
import { useAuthStore } from "@/stores/authStore";

import ExamStatistics from "./ExamStatistics";
import FlashcardsStatistics from "./FlashcardsStatistics";
import TestHistory from "./TestHistory";

const StatisticsPage = () => {
  const { user } = useAuthStore();

  const { data: statistics, isPending } = useQuery({
    queryKey: ["statistics", user?.id],
    queryFn: async () => {
      const studyModeStatisticsPromise = statisticsService.examDashboard({
        module: "STUDY",
      });
      const testModeStatisticsPromise = statisticsService.examDashboard({
        module: "TEST",
      });
      const examHistoryPromise = statisticsService.examHistory();

      const [studyModeStatistics, testModeStatistics, examHistory] =
        await Promise.all([
          studyModeStatisticsPromise,
          testModeStatisticsPromise,
          examHistoryPromise,
        ]);

      return {
        studyMode: studyModeStatistics,
        testMode: testModeStatistics,
        examHistory,
      };
    },
  });

  if (isPending && !statistics) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin text-[#2056F2]" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-medium text-center xl:text-left">
          Estatísticas
        </h1>
        <div
          className="flex items-center gap-1"
          data-tooltip-id="consecutive-study"
          data-tooltip-content="Número de dias de estudo consecutivos"
        >
          <Zap size={24} className="text-[#e7bd14]" />
          <span className="text-[16px] font-bold">
            {user?.statistics.daysStudiedConsecutively}
          </span>
        </div>
        <Tooltip id="consecutive-study" />
      </div>

      <div className="flex flex-col items-center justify-center xl:flex-row xl:justify-between gap-6 md:gap-12 flex-wrap">
        <div className="w-full max-w-[527px]">
          <ExamStatistics
            totalQuestions={
              statistics?.studyMode.totalQuestionsAnsweredByUser || 0
            }
            correctAnswers={
              statistics?.studyMode.totalCorrectQuestionsByUser || 0
            }
            wrongAnswers={statistics?.studyMode.totalWrongQuestionsByUser || 0}
            module="STUDY"
          />
        </div>
        <div className="w-full max-w-[527px]">
          <ExamStatistics
            totalQuestions={
              statistics?.testMode.totalQuestionsAnsweredByUser || 0
            }
            correctAnswers={
              statistics?.testMode.totalCorrectQuestionsByUser || 0
            }
            wrongAnswers={statistics?.testMode.totalWrongQuestionsByUser || 0}
            module="TEST"
          />
        </div>
        <div className="w-full max-w-[527px]">
          <FlashcardsStatistics
            totalFlashcardsStudied={user?.statistics.completedFlashcards}
          />
        </div>
        <div className="w-full max-w-[527px] max-h-[500px] overflow-y-auto">
          <TestHistory
            data={(statistics?.examHistory || []).map((test) => ({
              id: test.id,
              name: test.name,
              category: test.category,
              questionsCount: test.questionsCount,
              questionsAnswered: test.questionsAnswered,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
