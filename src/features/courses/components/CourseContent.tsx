"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useCallback, useState } from "react";

import { coursesService } from "@/services/coursesService";

import ModuleItem from "./ModuleItem";

type CourseContentProps = {
  isExpanded: boolean;
  courseId: string;
  goToModule: (module: ModuleType) => void;
};

const CourseContent = ({
  isExpanded,
  courseId,
  goToModule,
}: CourseContentProps) => {
  const { data: modules, isPending: isPedingModules } = useQuery({
    queryKey: ["modules", courseId, isExpanded],
    queryFn: async () => {
      if (isExpanded) {
        return await coursesService.listModules(courseId);
      }

      return Promise.resolve([]);
    },
  });

  return (
    <>
      {isExpanded && (
        <div className="flex gap-4 flex-col mt-[16px]">
          {isPedingModules ? (
            <Loader className="animate-spin" />
          ) : (
            modules?.map((module) => (
              <ModuleItem
                module={module}
                onModuleClick={goToModule}
                key={module.id}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default CourseContent;
