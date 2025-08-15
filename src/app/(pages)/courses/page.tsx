"use client";

import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import SearchInput from "@/components/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services/coursesService";
import { Loader } from "lucide-react";
import CourseCard from "@/features/courses/CourseCard";
import withAuth from "@/hocs/withAuth";

const CoursesPage = () => {
  const HeaderTitle = React.useMemo(() => {
    return <div className="flex justify-start items-center w-full gap-[16px]">
      <span>Vídeo Aulas</span>
      <SearchInput placeholder="Pesquise por termos e questões" className="mr-[16px] ml-auto min-w-[400px]" />
    </div>
  }, []);

  const { data: courses, isPending: isPendingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      return await coursesService.listCourses();
    },
  });

  return (
    <PageLayout headerTitle={HeaderTitle} headerType="back">
      <div className="grid grid-cols-3 gap-4">
        {isPendingCourses ? (
          <Loader className="animate-spin" />
        ) : (
          // Ensure that you handle the case where courses might be undefined or an array of objects
          courses && Array.isArray(courses) ? (
            courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            // Handle the case where courses is not available or incorrectly typed
            <p>No courses available</p>
          )
        )}
      </div>
    </PageLayout>
  );
};
export default withAuth(CoursesPage);
