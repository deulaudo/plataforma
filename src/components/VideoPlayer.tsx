"use client";

import Theme from "player.style/sutro/react";
import { SyntheticEvent, useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  videoSource: string;
  videoThumbnail?: string;
  onVideoLoad?: () => void;
  onVideoLoadDone?: () => void;
  onVideoEnd?: () => void;
  onVideoStart?: () => void;
  onVideoWasWatched?: () => void;
};

const VideoPlayer = ({
  videoSource,
  videoThumbnail,
  onVideoLoad,
  onVideoLoadDone,
  onVideoEnd,
  onVideoStart,
  onVideoWasWatched,
}: VideoPlayerProps) => {
  const [isWatched, setIsWatched] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update progress bar
  const handleTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      if (videoRef?.current) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;

        const calcProgress = (currentTime / duration) * 100;

        if (calcProgress >= 50 && !isWatched) {
          setIsWatched(true);
          if (onVideoWasWatched) {
            onVideoWasWatched();
          }
        }
      }
    },
    [isWatched, onVideoWasWatched],
  );

  const handleStart = useCallback(() => {
    onVideoStart && onVideoStart();
  }, [onVideoStart]);

  const handleLoad = useCallback(() => {
    onVideoLoad && onVideoLoad();
  }, [onVideoLoad]);

  const handleLoadDone = useCallback(() => {
    onVideoLoadDone && onVideoLoadDone();
  }, [onVideoLoadDone]);

  const handleEnd = useCallback(() => {
    onVideoEnd && onVideoEnd();
  }, [onVideoEnd]);

  return (
    <Theme
      style={{
        width: "100%",
        borderRadius: "36px",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <img
        className="object-contain w-full h-full"
        slot="poster"
        src={videoThumbnail}
        alt="Thumbnail"
      />
      <ReactPlayer
        ref={videoRef}
        slot="media"
        playsInline
        src={videoSource}
        controls={false}
        onPlaying={handleStart}
        onEnded={handleEnd}
        onLoadStart={handleLoad}
        onReady={handleLoadDone}
        onTimeUpdate={handleTimeUpdate}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "auto",
        }}
      ></ReactPlayer>
    </Theme>
  );
};

export default VideoPlayer;
