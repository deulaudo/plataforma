import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { CircleUser, Loader, SendHorizontal, User, X } from "lucide-react";
import { XIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z, { set } from "zod";

import TextArea from "@/components/TextArea";
import VideoPlayer from "@/components/VideoPlayer";
import { coursesService } from "@/services/coursesService";

import ModuleCard from "./ModuleCard";

interface ModuleProps {
  module: ModuleType;
}

const ComentarioFormSchema = z.object({
  comentario: z.string(),
});

type ComentarioFormData = z.infer<typeof ComentarioFormSchema>;

const Module: React.FC<ModuleProps> = ({ module }) => {
  const [videoLoaded, setVideoLoaded] = useState<VideoType>();
  const [replyComment, setReplyComment] = useState<ComentarioType>();
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [loadingSubmitComment, setLoadingSubmitComment] = useState(false);
  const [someVideoWatched, setSomeVideoWatched] = useState(false);
  const { control, formState, reset, handleSubmit, setFocus } =
    useForm<ComentarioFormData>({
      resolver: zodResolver(ComentarioFormSchema),
      defaultValues: {
        comentario: "",
      },
    });

  const { data: comentarios, isPending: isPendingComentarios } = useQuery({
    queryKey: ["comentarios", videoLoaded, loadingSubmitComment],
    queryFn: async () => {
      return videoLoaded
        ? await coursesService.getVideoComentarios(videoLoaded.id)
        : Promise.resolve([]);
    },
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

  const closeVideo = useCallback(() => {
    setVideoLoaded(undefined);
  }, []);

  const onVideoWatched = useCallback(async () => {
    try {
      if (!videoLoaded) return;
      const result = await coursesService.updateVideo(videoLoaded.id);

      if (!result) return;
      setSomeVideoWatched(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setSomeVideoWatched(false);
    }
  }, [videoLoaded]);

  const onComentarioSubmit = useCallback(
    async (formData: ComentarioFormData) => {
      setLoadingSubmitComment(true);
      try {
        if (videoLoaded) {
          const result = await coursesService.createVideoComentario(
            videoLoaded?.id,
            formData.comentario,
          );
        }
      } catch (error) {
      } finally {
        reset();
        setLoadingSubmitComment(false);
      }
    },
    [reset, videoLoaded],
  );

  const onResponderComentario = useCallback(
    (comentario: ComentarioType) => {
      setReplyComment(comentario);
      setFocus("comentario");
    },
    [setFocus],
  );

  return (
    <div className="flex flex-row gap-4">
      <div
        className={`flex flex-col items-center gap-4 ${isLoadingVideo || videoLoaded ? "w-2/3" : "hidden"}`}
      >
        <div className="flex flex-1 relative w-full h-full">
          <button
            onClick={closeVideo}
            className="absolute bg-white hover:border-b-blue-800 top-4 right-4 z-100 text-gray-800 rounded-full cursor-pointer w-8 h-8 flex items-center justify-center"
          >
            <XIcon size={18} />
          </button>
          {isLoadingVideo ? (
            <div className="flex flex-1 flex-col justify-center items-center rounded-[36px] w-full h-full mx-auto bg-secondary overflow-hidden shadow-lg">
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
        <div className="flex flex-col w-[80%] gap-2">
          <p className="font-bold">
            <span className="text-[#2056F2] dark:text-[#2056F2] mr-1">
              {comentarios?.length && comentarios?.length > 0
                ? comentarios?.length
                : 0}
            </span>
            {comentarios?.length && comentarios?.length > 1
              ? "Comentários"
              : "Comentário"}
          </p>
          <form
            onSubmit={handleSubmit(onComentarioSubmit)}
            className="w-full relative"
          >
            <Controller
              control={control}
              name="comentario"
              render={({ field, fieldState }) => (
                <TextArea
                  value={field.value}
                  placeholder={
                    !!replyComment
                      ? `Respondendo: ${replyComment.user.name}`
                      : "Faça um comentário ou tire uma dúvida"
                  }
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
            {(!!replyComment || formState.isDirty) && (
              <button
                type="button"
                className="cursor-pointer absolute left-2 bottom-2 dark:text-[#FFFFFF80] text-[#000000BF]"
                onClick={() => {
                  setReplyComment(undefined);
                  reset();
                  setTimeout(() => {
                    setFocus("comentario");
                  });
                }}
              >
                <X size={20} />
              </button>
            )}
            <button
              type="submit"
              className="cursor-pointer absolute right-2 bottom-2 dark:text-[#FFFFFF80] text-[#000000BF]"
            >
              {loadingSubmitComment ? (
                <Loader className="animate-spin mr-2" size={16} />
              ) : (
                <SendHorizontal size={20} />
              )}
            </button>
          </form>
          <div className="flex flex-col gap-[8px]">
            {isPendingComentarios ? (
              <Loader className="animate-spin mr-2" size={16} />
            ) : (
              <>
                {comentarios?.map((comentario) => (
                  <div
                    key={comentario.id}
                    className="flex flex-row w-full gap-[16px] p-[16px]"
                  >
                    <div className="w-[24px] h-[24px] rounded dark:text-[#FFFFFF80] text-[#000000BF]">
                      <CircleUser />
                    </div>
                    <div className="flex flex-col w-full gap-[4px] items-start">
                      <span className="dark:text-[#FFFFFF80] text-[#000000BF] text-[12px] font-normal">
                        {comentario.user.name}
                      </span>
                      <p className="dark:text-[#FFFFFF] text-[#000000] text-[16px] font-normal">
                        {comentario.content}
                      </p>
                      <button
                        type="button"
                        className="cursor-pointer dark:text-[#FFFFFF80] text-[#000000BF] text-[12px] font-normal]"
                        onClick={() => {
                          onResponderComentario(comentario);
                        }}
                      >
                        Responder
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
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
