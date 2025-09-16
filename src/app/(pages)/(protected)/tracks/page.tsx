"use client";

import PageLayout from "@/components/PageLayout";
import CourseTrackList from "@/features/track/components/CourseTrackList";

const TracksPage = () => {
  return (
    <PageLayout headerTitle={"Trilhas"} headerType="back">
      <CourseTrackList />
    </PageLayout>
  );
};

export default TracksPage;
