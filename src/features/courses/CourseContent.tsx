"use client";
import { coursesService } from '@/services/coursesService';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useCallback, useState } from 'react';
import ModuleContent from './ModuleContent';
import { useRouter } from "next/navigation";

type CourseContentProps = {
  isExpanded: boolean;
  courseId: string;
};

const CourseContent = ({
  isExpanded,
  courseId,
}: CourseContentProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { data: modules, isPending: isPedingModules } = useQuery({
    queryKey: ["modules", courseId, isExpanded],
    queryFn: async () => {
      if (isExpanded) {
        return await coursesService.listModules(courseId);
      }

      return Promise.resolve([]);
    },
  });

  const goToModule = useCallback((moduleId: string) => {
    console.log(moduleId);
    router.push(`/courses/modules/${moduleId}`);
  }, []);

  return (<>
    {isExpanded && (<div className="flex gap-4 flex-col mt-[16px]">
      {isPedingModules ? (
        <Loader className="animate-spin" />
      ) : modules?.map((module) => (
        <ModuleContent module={module} onModuleClick={goToModule} key={module.id}/>
      ))}
    </div>)}
  </>
  );
};

export default CourseContent;