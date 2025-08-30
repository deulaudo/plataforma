"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import PageLayout from "@/components/PageLayout";
import SearchInput from "@/components/SearchInput";
import CourseCard from "@/features/courses/components/CourseCard";
import Module from "@/features/courses/components/Module";
import withAuth from "@/hocs/withAuth";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { coursesService } from "@/services/coursesService";

const CoursesPage = () => {
  const { back } = useRouter();
  const [currentModule, setCurrentModule] = useState<ModuleType>();
  const { selectedProduct } = useSelectedProduct();

  const { data: courses, isPending: isPendingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      return await coursesService.listCourses({
        productId: selectedProduct?.id,
      });
    },
  });

  const HeaderTitle = React.useMemo(() => {
    return (
      <div className="flex justify-start items-center w-full gap-[16px]">
        <span>Vídeo Aulas</span>
      </div>
    );
  }, []);

  const showCoursesList = useMemo(() => {
    return !currentModule && courses && Array.isArray(courses);
  }, [courses, currentModule]);

  const goToModule = useCallback((module: ModuleType) => {
    setCurrentModule(module);
  }, []);

  const pageBack = useCallback(() => {
    if (currentModule) {
      setCurrentModule(undefined);
      return;
    }

    back();
  }, [back, currentModule]);

  const PageContent = useMemo(() => {
    if (isPendingCourses) {
      return <Loader className="animate-spin" />;
    }
    if (currentModule) {
      return <Module module={currentModule} />;
    }
    if (showCoursesList && courses) {
      return (
        <div className="grid grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard
              course={course}
              key={course.id}
              goToModule={goToModule}
            />
          ))}
        </div>
      );
    }

    return <p>No courses available</p>;
  }, [courses, currentModule, isPendingCourses, showCoursesList, goToModule]);

  return (
    <PageLayout
      headerTitle={HeaderTitle}
      headerType="back"
      backAction={pageBack}
    >
      {PageContent}
    </PageLayout>
  );
};
export default withAuth(CoursesPage);
