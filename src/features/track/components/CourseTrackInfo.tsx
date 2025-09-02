"use client";

import { X } from "lucide-react";
import { useTheme } from "next-themes";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import SegmentedProgressCircle from "@/components/SegmentedProgressCircle";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CourseTrackModuleInfoProps = {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  module: {
    id: string;
    imageUrl: string | null;
    title: string;
    description: string;
    totalVideos: number;
    totalVideosWatched: number;
  };
};

const CourseTrackModuleInfo = ({
  isOpen,
  onClose,
  courseId,
  module,
}: CourseTrackModuleInfoProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const isModuleCompleted = module.totalVideosWatched === module.totalVideos;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <SegmentedProgressCircle
                  segments={module.totalVideos}
                  progress={module.totalVideosWatched}
                  activeColor={isModuleCompleted ? "#1ed476" : "#346fff"}
                  inactiveColor={theme === "dark" ? "#2a2a2a" : "#dcdee5"}
                  textColor={theme !== "dark" ? "#000000" : "#ffffff"}
                  size={52}
                  strokeWidth={5}
                />

                <div className="flex flex-col">
                  <span className="font-bold text-[16px]">{module.title}</span>
                  <span className="font-bold text-[12px] text-[#2056F2]">
                    {module.totalVideos} aulas
                  </span>
                </div>
              </div>
              <X size={24} className="cursor-pointer" onClick={onClose} />
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <span className="text-[12px] text-[#000000BF] dark:text-[#FFFFFF80]">
            {module.description}
          </span>

          <Button
            onClick={() => {
              router.push(`/courses/${courseId}/modules/${module.id}`);
            }}
            theme={isModuleCompleted ? "green" : "blue"}
            fullWidth
          >
            {isModuleCompleted ? "Revisar módulo" : "Acessar módulo"}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseTrackModuleInfo;
