"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import CourseTrackInfo from "./CourseTrackInfo";

type CourseTrackProps = {
  courseName: string;
  modules: {
    id: string;
    imageUrl: string | null;
    title: string;
    description: string;
    totalVideos: number;
    totalVideosWatched: number;
  }[];
};

const CourseTrack = ({ courseName, modules }: CourseTrackProps) => {
  const totalVideos = modules.reduce(
    (acc, module) => acc + module.totalVideos,
    0,
  );

  return (
    <div
      className={twMerge(
        "bg-[#EDEEEF] dark:bg-[#141926]",
        "border dark:border-[#FFFFFF0D] border-[#0000000D]",
        "p-[24px] w-full max-w-[400px] rounded-[64px]",
      )}
    >
      {/** Header */}
      <div className="flex flex-col gap-1">
        <span className="text-[20px] font-bold">Trilha do {courseName}</span>
        <span className="text-[12px] dark:text-[#FFFFFF80] text-[#000000BF] font-medium">
          {modules.length} Módulos • {totalVideos} Vídeos
        </span>
      </div>

      <div className="flex flex-col gap-6 mt-6 w-[200px] mx-auto">
        {modules.map((module, order) => {
          return (
            <TrackModule
              key={module.id}
              id={module.id}
              hasNextModule={order < modules.length - 1}
              isFirstModule={order === 0}
              isModuleCompleted={
                module.totalVideosWatched === module.totalVideos
              }
              isPreviousModuleCompleted={
                order === 0 ||
                modules[order - 1].totalVideosWatched ===
                  modules[order - 1].totalVideos
              }
              order={order}
              imageUrl={module.imageUrl}
              title={module.title}
              description={module.description}
              totalVideos={module.totalVideos}
              totalVideosWatched={module.totalVideosWatched}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseTrack;

type TrackModuleProps = {
  id: string;
  order: number;
  isFirstModule: boolean;
  hasNextModule: boolean;
  isModuleCompleted: boolean;
  isPreviousModuleCompleted: boolean;
  imageUrl: string | null;
  title: string;
  description: string;
  totalVideos: number;
  totalVideosWatched: number;
};

const TrackModule = ({
  id,
  order,
  isFirstModule,
  hasNextModule,
  imageUrl,
  title,
  description,
  isModuleCompleted,
  isPreviousModuleCompleted,
  totalVideos,
  totalVideosWatched,
}: TrackModuleProps) => {
  const [isModuleInfoOpen, setIsModuleInfoOpen] = useState<boolean>(false);

  const moduleAttrs = useMemo(() => {
    if (totalVideosWatched === 0) {
      return "dark:bg-[#29324a] bg-[#CCD0D4] border-b-[8px] dark:border-b-[#1e263d] border-b-[#b6bcc3]";
    }

    if (isModuleCompleted) {
      return "bg-[#1ccc6b] border-b-[8px] border-b-[#0e856b]";
    }

    return "bg-[#2056F2] border-b-[8px] border-b-[#154399]";
  }, [isModuleCompleted, totalVideosWatched]);

  return (
    <div
      className={twMerge(
        "relative",
        order % 2 === 0 ? "self-start" : "self-end",
      )}
    >
      {/** Module Element */}
      <div
        onClick={() => setIsModuleInfoOpen(true)}
        className={twMerge(
          "w-[64px] h-[64px] rounded-[24px]",
          "flex items-center justify-center",
          moduleAttrs,
          "cursor-pointer",
          "relative z-20",
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-[32px] h-[32px] object-cover"
          />
        ) : (
          <span className="text-white font-medium">{title[0]}</span>
        )}
      </div>

      {order % 2 === 0 ? (
        <RightLink
          isModuleCompleted={isModuleCompleted}
          isPreviousModuleCompleted={isPreviousModuleCompleted}
          isFirstModule={isFirstModule}
          hasNextModule={hasNextModule}
        />
      ) : (
        <LeftLink
          color={isModuleCompleted ? "#1f3f3f" : "#CCD0D4"}
          hasNextModule={hasNextModule}
          isModuleCompleted={isModuleCompleted}
          isPreviousModuleCompleted={isPreviousModuleCompleted}
        />
      )}

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CourseTrackInfo
          isOpen={isModuleInfoOpen}
          onClose={() => setIsModuleInfoOpen(false)}
          module={{
            id,
            imageUrl,
            title,
            description,
            totalVideos,
            totalVideosWatched,
          }}
        />
      </div>
    </div>
  );
};

const RightLink = (props: {
  isFirstModule: boolean;
  hasNextModule: boolean;
  isModuleCompleted: boolean;
  isPreviousModuleCompleted: boolean;
}) => {
  return (
    <>
      {!props.isFirstModule && (
        <div
          className={twMerge(
            "bottom-[24px] right-[38px] z-10",
            "w-[80px] h-[50px] absolute",
            // borda apenas em cima e direita
            `border-b-[16px] border-l-[16px] ${props.isPreviousModuleCompleted ? "border-[#1f3f3f]" : "dark:border-[#202531] border-[#CCD0D4]"}`,
            // arredondar só o canto superior direito
            "rounded-bl-[64px]",
          )}
        />
      )}

      {props.hasNextModule && (
        <div
          className={twMerge(
            "top-[24px] left-[24px] z-10",
            "w-[230px] h-[55px] absolute",
            // borda apenas em cima e direita
            `border-t-[16px] border-r-[16px] ${props.isModuleCompleted ? "border-[#1f3f3f]" : "dark:border-[#202531] border-[#CCD0D4]"}`,
            // arredondar só o canto superior direito
            "rounded-tr-[64px]",
          )}
        />
      )}
    </>
  );
};

const LeftLink = (props: {
  color: string;
  hasNextModule: boolean;
  isModuleCompleted: boolean;
  isPreviousModuleCompleted: boolean;
}) => {
  return (
    <>
      {props.hasNextModule && (
        <div
          className={twMerge(
            "top-[24px] right-[24px] z-10",
            "w-[230px] h-[55px] absolute",
            // borda apenas em cima e direita
            `border-t-[16px] border-l-[16px] ${props.isModuleCompleted ? "border-[#1f3f3f]" : "dark:border-[#202531] border-[#CCD0D4]"}`,
            // arredondar só o canto superior direito
            "rounded-tl-[64px]",
          )}
        />
      )}

      <div
        className={twMerge(
          "bottom-[24px] left-[38px] z-10",
          "w-[80px] h-[50px] absolute",
          `border-b-[16px] border-r-[16px] ${props.isPreviousModuleCompleted ? "border-[#1f3f3f]" : "dark:border-[#202531] border-[#CCD0D4]"}`,
          "rounded-br-[64px]",
        )}
      />
    </>
  );
};
