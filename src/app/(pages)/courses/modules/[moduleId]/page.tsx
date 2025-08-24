/* eslint-disable prettier/prettier */
"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use, useCallback, useMemo, useState } from "react";

import PageLayout from "@/components/PageLayout";
import SearchInput from "@/components/SearchInput";
import VideoPlayer from "@/components/VideoPlayer";
import ModuleCard from "@/features/courses/ModuleCard";
import withAuth from "@/hocs/withAuth";
import { coursesService } from "@/services/coursesService";

const ModulePage = ({ params }: { params: Promise<{ moduleId: string }> }) => {
  const { moduleId } = use(params);

  const [videoLoaded, setVideoLoaded] = useState<VideoType>();
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [someVideoWatched, setSomeVideoWatched] = useState(false);

  const { data: module, isPending } = useQuery({
    queryKey: ["module"],
    queryFn: async () => {
      return await coursesService.getModule(moduleId);
    },
    initialData: {
      totalVideos: 0,
      totalWatched: 0,
    } as ModuleType,
  });

  const onChangeVideo = useCallback(async (video: VideoType) => {
    setIsLoadingVideo(true);
    setVideoLoaded(undefined);
    try {
      const result = await coursesService.getVideo(video.id);

      if (result) {
        setVideoLoaded(result);
      }
    } catch (error) {
      setVideoLoaded(undefined);
    } finally {
      setIsLoadingVideo(false);
    }
  }, []);

  const onVideoWatched = useCallback(async () => {
    try {
      if (!videoLoaded) return;
      const result = await coursesService.updateVideo(videoLoaded.id);

      if (!result) return;
      setSomeVideoWatched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSomeVideoWatched(false);
    }
  }, [videoLoaded]);

  const HeaderTitle = useMemo(() => {
    return (
      <div className="flex justify-start items-center w-full gap-[16px]">
        <span>Vídeo Aulas</span>
        <SearchInput
          placeholder="Pesquise por termos e questões"
          className="mr-[16px] ml-auto min-w-[400px]"
        />
      </div>
    );
  }, []);

  return (
    <PageLayout headerType="back" headerTitle={HeaderTitle}>
      {isPending && !module ? (
        <Loader className="animate-spin" />
      ) : (
          <div className="flex flex-row gap-4">
            <div
              className={`flex ${isLoadingVideo || videoLoaded ? "w-2/3" : "hidden"}`}
            >
              {isLoadingVideo ? (
                <div className="flex flex-col justify-center items-center w-full h-full mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                videoLoaded && (
                  <VideoPlayer
                    videoSource={videoLoaded.url}
                    videoThumbnail={videoLoaded.thumbnailUrl}
                    onVideoWasWatched={onVideoWatched}
                  />
                )
              )}
            </div>
            <ModuleCard
              contentClassName={`${isLoadingVideo || videoLoaded ? "w-1/3" : "w-full"}`}
              module={module}
              currentVideo={videoLoaded}
              someVideoWatched={someVideoWatched}
              onChooseVideo={onChangeVideo}
            />
          </div>
      )}
    </PageLayout>
  );
};

export default withAuth(ModulePage);
