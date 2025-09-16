"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { Loader, XIcon } from "lucide-react";
import React, { use, useCallback, useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import PageLayout from "@/components/PageLayout";
import Tabs from "@/components/Tabs";
import VideoPlayer from "@/components/VideoPlayer";
import CommentsBox from "@/features/comments/CommentsBox";
import ModuleCard from "@/features/courses/components/ModuleCard";
import withAuth from "@/hocs/withAuth";
import { coursesService } from "@/services/coursesService";

const ModulePage = ({
  params,
}: {
  params: Promise<{ id: string; moduleId: string }>;
}) => {
  const queryClient = useQueryClient();
  const { id, moduleId } = use(params);
  const { back, push } = useRouter();
  const searchParams = useSearchParams();
  const [videoLoaded, setVideoLoaded] = useState<VideoType>();
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [someVideoWatched, setSomeVideoWatched] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("dicas");

  const { data: module, isPending: isPendingModule } = useQuery({
    queryKey: ["module"],
    queryFn: async () => {
      return await coursesService.getModule(moduleId);
    },
  });

  const pageBack = useCallback(() => {
    push(`/courses/${id}/`);
  }, [id, push]);

  const onChangeVideo = useCallback(async (videoId: string) => {
    setIsLoadingVideo(true);
    setVideoLoaded(undefined);
    try {
      const result = await coursesService.getVideo(videoId);

      if (result) {
        setVideoLoaded(result);
      }
    } catch (error) {
      setVideoLoaded(undefined);
    } finally {
      setIsLoadingVideo(false);
    }
  }, []);

  const closeVideo = useCallback(() => {
    setVideoLoaded(undefined);
  }, []);

  const onVideoWatched = useCallback(async () => {
    try {
      if (!videoLoaded) return;
      const result = await coursesService.updateVideo(videoLoaded.id);
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });

      if (!result) return;
      setSomeVideoWatched(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setSomeVideoWatched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoLoaded]);

  const headerTitle = useMemo(() => {
    if (!module) return "Vídeo Aulas - Módulo";
    return `Vídeo Aulas - Módulo: ${module?.title}`;
  }, [module]);

  const videoId = useMemo(() => {
    return searchParams.get("video");
  }, [searchParams]);

  useEffect(() => {
    if (videoId) {
      onChangeVideo(videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const PageContent = useMemo(() => {
    if (isPendingModule) {
      return (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" size={24} />
        </div>
      );
    }
    if (module) {
      return (
        <div className="flex flex-1 flex-col lg:flex-row gap-4 overflow-hidden">
          <div
            className={`flex flex-col items-center gap-4 ${isLoadingVideo || videoLoaded ? "w-full lg:w-2/3" : "hidden"}`}
          >
            <div className="flex flex-1 relative w-full h-full min-h-[200px] lg:min-h-[400px]">
              <button
                onClick={closeVideo}
                className="absolute bg-white hover:border-b-blue-800 top-2 right-2 lg:top-4 lg:right-4 z-50 text-gray-800 rounded-full cursor-pointer w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center shadow-md"
              >
                <XIcon size={14} className="lg:w-[18px] lg:h-[18px]" />
              </button>
              {!isLoadingVideo && videoLoaded ? (
                <VideoPlayer
                  videoSource={videoLoaded.url}
                  videoThumbnail={videoLoaded.thumbnailUrl}
                  onVideoWasWatched={onVideoWatched}
                />
              ) : (
                <div className="flex flex-col justify-center items-center rounded-[36px] w-full h-full mx-auto overflow-hidden">
                  <Loader className="animate-spin" />
                </div>
              )}
            </div>
            <div className="w-full gap-2">
              <Tabs
                activeTabId={currentTab}
                onTabChange={(tabId: string) => setCurrentTab(tabId)}
                tabs={[
                  {
                    id: "dicas",
                    label: "Dicas do Duzinho",
                    content: (
                      <div
                        className="p-4 bg-white dark:bg-[#141926] border border-[#EDEEEF] dark:border-[#202531] rounded-lg text-sm text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html:
                            videoLoaded?.description.replace(
                              /\n/g,
                              "<br /><br/>",
                            ) || "",
                        }}
                      />
                    ),
                  },
                  {
                    id: "comentarios",
                    label: "Comentários",
                    content: videoLoaded && (
                      <CommentsBox
                        referenceType="VIDEO"
                        referenceId={videoLoaded.id}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <ModuleCard
            courseId={id}
            module={module}
            contentClassName={`${isLoadingVideo || videoLoaded ? "w-full lg:w-1/3" : "w-full"} ${isLoadingVideo || videoLoaded ? "mt-4 lg:mt-0" : ""}`}
            currentVideo={videoLoaded}
            handleVideoSelect={onChangeVideo}
          />
        </div>
      );
    }
  }, [
    closeVideo,
    currentTab,
    id,
    isLoadingVideo,
    isPendingModule,
    module,
    onChangeVideo,
    onVideoWatched,
    videoLoaded,
  ]);

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
export default withAuth(ModulePage);
