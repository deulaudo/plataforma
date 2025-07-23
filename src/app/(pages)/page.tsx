"use client";

import PageLayout from "@/components/PageLayout";
import withAuth from "@/hocs/withAuth";

const HomePage = () => {
  return (
    <PageLayout headerType="welcome">
      <h1 className="text-2xl font-bold">Welcome to the Home Page dsadas</h1>
    </PageLayout>
  );
};

export default withAuth(HomePage);
