"use client";

import PageLayout from "@/components/PageLayout";
import StatisticsPage from "@/features/statistics/components/StatisticsPage";
import withAuth from "@/hocs/withAuth";

const HomePage = () => {
  return (
    <PageLayout headerType="welcome">
      <StatisticsPage />
    </PageLayout>
  );
};

export default withAuth(HomePage);
