"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { useSelectedProduct } from "@/hooks/useSelectedProduct";
import { coursesService } from "@/services/coursesService";

import CourseTrack from "./CourseTrack";

const CourseTrackList = () => {
  const { selectedProduct } = useSelectedProduct();
  const { data: tracks, isPending: isLoadingTracks } = useQuery({
    queryKey: ["tracks", selectedProduct?.id],
    queryFn: async () => {
      if (!selectedProduct) return [];

      const courses = await coursesService.listCourses({
        productId: selectedProduct.id,
      });
      const modulesPromises = courses.map(async (course) => {
        const modules = await coursesService.listModules(course.id);
        return {
          courseId: course.id,
          modules,
        };
      });

      const modulesByCourse = await Promise.all(modulesPromises);
      return courses.map((course) => ({
        ...course,
        modules:
          modulesByCourse.find((m) => m.courseId === course.id)?.modules || [],
      }));
    },
  });

  if (isLoadingTracks) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin text-[#2056F2]" size={32} />
      </div>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <div className="text-center text-[#000000BF] dark:text-[#FFFFFF80]">
        Nenhuma trilha disponível no momento.
      </div>
    );
  }

  return (
    <div className="flex justify-center lg:justify-between flex-wrap gap-8">
      {tracks?.map((track) => (
        <CourseTrack
          key={track.id}
          courseName={track.title}
          modules={track.modules.map((module) => ({
            id: module.id,
            imageUrl: module.cover,
            title: module.title,
            description: module.description,
            totalVideos: module.totalVideos,
            totalVideosWatched: module.totalWatched,
          }))}
        />
      ))}
    </div>
  );
};

export default CourseTrackList;
