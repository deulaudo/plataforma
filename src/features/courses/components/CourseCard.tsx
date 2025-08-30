"use client";

import { useMemo } from "react";

type CourseCardProps = {
  course: CourseType;
  goToCourse: (courseId: string) => void;
};

const CourseCard = ({ course, goToCourse }: CourseCardProps) => {
  const courseDone = useMemo(
    () => course.totalModulesDone === course.totalModules,
    [course],
  );

  return (
    <div
      onClick={() => {
        goToCourse(course.id);
      }}
      className={`flex w-full cursor-pointer min-h-[170px] flex-shrink-0 flex-col gap-2 py-[24px] px-[16px] ${courseDone ? "dark:bg-[#101F25] bg-[#ECFBF4]" : "dark:bg-[#10182C] bg-[#EDF1FE]"} rounded-[36px] border border-[#FFFFFF0D] self-start`}
    >
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center w-[52px] h-[52px] p-[4px] rounded-[20px] border border-[#E9EAEC] dark:border-[#FFFFFF0D]">
          <img alt="" className="w-[25px] h-[25px]" src={course.cover} />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="font-bold text-[16px] dark:text-white">
            {course.title}
          </span>
          <span
            className={`font-bold text-[12px] ${courseDone ? "text-[#1CD475]" : "text-[#2056F2]"}`}
          >
            {course.totalModules} modulos
          </span>
        </div>
      </div>

      <div className="flex w-full p-[4px]">
        <p className="font-normal text-[12px] text-justify text-[#000000] dark:text-white">
          {course.description}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
