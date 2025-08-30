"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader, Zap } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

import PageLayout from "@/components/PageLayout";
import Tabs from "@/components/Tabs";
import ExamStatistics from "@/features/statistics/components/ExamStatistics";
import FlashcardsStatistics from "@/features/statistics/components/FlashcardsStatistics";
import StatisticsPage from "@/features/statistics/components/StatisticsPage";
import TestHistory from "@/features/statistics/components/TestHistory";
import CourseTrack from "@/features/track/components/CourseTrack";
import CourseTrackList from "@/features/track/components/CourseTrackList";
import withAuth from "@/hocs/withAuth";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { coursesService } from "@/services/coursesService";
import { statisticsService } from "@/services/statisticsService";
import { useAuthStore } from "@/stores/authStore";

const HomePage = () => {
  const [tabSelected, setTabSelected] = useState<string>("statistics");

  return (
    <PageLayout headerType="welcome">
      <Tabs
        activeTabId={tabSelected}
        onTabChange={(tab) => setTabSelected(tab)}
        tabs={[
          {
            id: "statistics",
            label: "Estatísticas",
            content: <StatisticsPage />,
          },
          {
            id: "tracks",
            label: "Trilhas",
            content: <CourseTrackList />,
          },
        ]}
      />
    </PageLayout>
  );
};

export default withAuth(HomePage);
