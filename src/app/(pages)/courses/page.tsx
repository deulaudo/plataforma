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
        <div className="flex gap-4 justify-between flex-wrap">
          {courses.map((course) => (
            <div key={course.id} className="w-full lg:max-w-[486px]">
              <CourseCard
                course={course}
                key={course.id}
                goToCourse={goToCourse}
              />
            </div>
          ))}
        </div>
      );
    }

    return <p>Sem cursos disponíveis</p>;
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
