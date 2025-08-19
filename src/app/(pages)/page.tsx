"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader, Zap } from "lucide-react";
import { Tooltip } from "react-tooltip";

import PageLayout from "@/components/PageLayout";
import ExamStatistics from "@/features/statistics/components/ExamStatistics";
import FlashcardsStatistics from "@/features/statistics/components/FlashcardsStatistics";
import TestHistory from "@/features/statistics/components/TestHistory";
import withAuth from "@/hocs/withAuth";
import { statisticsService } from "@/services/statisticsService";
import { useAuthStore } from "@/stores/authStore";

const HomePage = () => {
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
      <PageLayout headerType="welcome">
        <div className="flex items-center justify-center h-full">
          <Loader className="animate-spin text-[#2056F2]" size={32} />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout headerType="welcome">
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
          <span className="text-[16px] font-bold">4</span>
        </div>
        <Tooltip id="consecutive-study" />
      </div>
      <div className="flex flex-col items-center justify-center xl:flex-row xl:justify-between gap-6 md:gap-12 flex-wrap">
        <div className="w-full max-w-[527px]">
          <ExamStatistics
            totalQuestions={
              statistics?.studyMode.totalCorrectQuestionsByUser || 0
            }
            correctAnswers={
              statistics?.studyMode.totalCorrectQuestionsByUser || 0
            }
            wrongAnswers={0}
            module="STUDY"
          />
        </div>
        <div className="w-full max-w-[527px]">
          <ExamStatistics
            totalQuestions={
              statistics?.testMode.totalCorrectQuestionsByUser || 0
            }
            correctAnswers={
              statistics?.testMode.totalCorrectQuestionsByUser || 0
            }
            wrongAnswers={0}
            module="TEST"
          />
        </div>
        <div className="w-full max-w-[527px]">
          <FlashcardsStatistics totalFlashcardsStudied={0} />
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
    </PageLayout>
  );
};

export default withAuth(HomePage);
