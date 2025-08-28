import { Loader } from "lucide-react";
import React, { useCallback, useState } from "react";

import VideoPlayer from "@/components/VideoPlayer";
import { coursesService } from "@/services/coursesService";

import ModuleCard from "./ModuleCard";

interface ModuleProps {
  module: ModuleType;
}

const Module: React.FC<ModuleProps> = ({ module }) => {
  const [videoLoaded, setVideoLoaded] = useState<VideoType>();
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [someVideoWatched, setSomeVideoWatched] = useState(false);
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

  return (
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
  );
};

export default Module;
