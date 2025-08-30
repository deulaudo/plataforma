"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";

import PageLayout from "@/components/PageLayout";
import CourseCard from "@/features/courses/components/CourseCard";
import withAuth from "@/hocs/withAuth";
import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { coursesService } from "@/services/coursesService";

const CoursesPage = () => {
  const { back, push } = useRouter();
  const { selectedProduct } = useSelectedProduct();

  const { data: courses, isPending: isPendingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      return await coursesService.listCourses({
        productId: selectedProduct?.id,
      });
    },
  });

  const goToCourse = useCallback(
    (courseId: string) => {
      push(`/courses/${courseId}`);
    },
    [push],
  );

  const pageBack = useCallback(() => {
    back();
  }, [back]);

  const PageContent = useMemo(() => {
    if (isPendingCourses) {
      return <Loader className="animate-spin" />;
    }

    if (courses) {
      return (
        <div className="grid grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard
              course={course}
              key={course.id}
              goToCourse={goToCourse}
            />
          ))}
        </div>
      );
    }

    return <p>No courses available</p>;
  }, [courses, goToCourse, isPendingCourses]);

  return (
    <PageLayout
      headerTitle="Vídeo Aulas - Cursos"
      headerType="back"
      backAction={pageBack}
    >
      {PageContent}
    </PageLayout>
  );
};
export default withAuth(CoursesPage);
