"use client";

import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { CircleOff, Loader } from "lucide-react";
import React, { use, useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";

import PageLayout from "@/components/PageLayout";
import ModuleCard from "@/features/courses/components/ModuleCard";
import withAuth from "@/hocs/withAuth";
import { coursesService } from "@/services/coursesService";

const CoursePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { back } = useRouter();

  const { data: course, isPending: isPendingCourse } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      return await coursesService.getCourse(id);
    },
  });

  const { data: modules, isPending: isPendingModules } = useQuery({
    queryKey: ["modules", course],
    queryFn: async () => {
      return !!course
        ? await coursesService.listModules(course.id)
        : Promise.resolve([]);
    },
  });

  const pageBack = useCallback(() => {
    back();
  }, [back]);

  const headerTitle = useMemo(() => {
    if (!course) return "Vídeo Aulas - Curso";
    return `Vídeo Aulas - Curso: ${course?.title}`;
  }, [course]);

  const PageContent = useMemo(() => {
    if (isPendingModules || isPendingCourse) {
      return (
        <div className="flex flex-col justify-center items-center rounded-[36px] w-full h-full mx-auto overflow-hidden">
          <Loader className="animate-spin" />
        </div>
      );
    }

    if (modules && modules.length > 0) {
      return (
        <div className="flex gap-4 justify-between flex-wrap">
          {modules.map((module) => (
            <div key={module.id} className="w-full lg:max-w-[486px]">
              <ModuleCard courseId={id} module={module} key={module.id} />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2 justify-center items-center mt-4">
        <CircleOff size={66} />
        <span className="text-[16px] text-center">
          Sem cursos disponíveis no momento
        </span>
      </div>
    );
  }, [id, isPendingModules, modules]);

  return (
    <PageLayout
      headerTitle={headerTitle}
      headerType="back"
      backAction={pageBack}
    >
      {PageContent}
    </PageLayout>
  );
};
export default withAuth(CoursePage);
