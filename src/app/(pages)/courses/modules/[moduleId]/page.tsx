"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { use, useCallback, useMemo, useState } from "react";

import PageLayout from "@/components/PageLayout";
import withAuth from "@/hocs/withAuth";
import { coursesService } from "@/services/coursesService";
import SearchInput from "@/components/SearchInput";
import ModuleCard from "@/features/courses/ModuleCard";
import VideoPlayer from "@/components/VideoPlayer";

const ModulePage = ({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) => {
  const { moduleId } = use(params);

  const { data: module, isPending } = useQuery({
    queryKey: ["module"],
    queryFn: async () => {
      return await coursesService.getModule(moduleId);
    },
    initialData: {
      totalVideos: 0,
      totalWatched: 0
    } as ModuleType
  });

  const [videoLoaded, setVideoLoaded] = useState<VideoType>();
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);

  const onChangeVideo = useCallback(async (video: VideoType) => {
    setIsLoadingVideo(true);
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
  }, [])

  const HeaderTitle = useMemo(() => {
    return <div className="flex justify-start items-center w-full gap-[16px]">
      <span>Vídeo Aulas</span>
      <SearchInput placeholder="Pesquise por termos e questões" className="mr-[16px] ml-auto min-w-[400px]" />
    </div>
  }, []);

  return (
    <PageLayout
      headerType="back"
      headerTitle={HeaderTitle}
    >
      {isPending && !module ? (
        <Loader className="animate-spin" />
      ) : (
          <div className="flex flex-row gap-4">
            {
              videoLoaded &&
              <div className="flex w-2/3">
                <VideoPlayer
                  videoSource={videoLoaded.url}
                />
              </div>
            }
            <ModuleCard contentClassName={`${!videoLoaded ? 'w-full' : 'w-1/3'}`} module={module} onChooseVideo={onChangeVideo} />
          </div>
      )}
    </PageLayout>
  );
};

export default withAuth(ModulePage);
