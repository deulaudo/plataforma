"use client";
import ReactPlayer from 'react-player'
import {
  MediaPosterImage
} from "media-chrome/react";
import { useState, useRef, useCallback } from 'react';
import Theme from 'player.style/demuxed-2022/react';

type VideoPlayerProps = {
  videoSource: string;
  videoThumbnail?: string;
  onVideoLoad?: () => void;
  onVideoLoadDone?: () => void;
  onVideoEnd?: () => void;
  onVideoStart?: () => void;
  onVideoWasWatched?: () => void;
};

const VideoPlayer = ({ videoSource, videoThumbnail, onVideoLoad, onVideoLoadDone, onVideoEnd, onVideoStart, onVideoWasWatched }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update progress bar
  const handleTimeUpdate = useCallback(() => {
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

      if (isNaN(calcProgress))
        setProgress(0);
      else
        setProgress(calcProgress);
    }
  }, []);

  // Handle video loaded
  const handleStart = useCallback(() => {
    onVideoStart && onVideoStart();
  }, []);


  return (
    <Theme style={{width: "100%", borderRadius: "36px"}}>
      <img className='object-cover' slot="poster" src={videoThumbnail} />
      <ReactPlayer
        slot="media"
        playsInline
        src={videoSource}
        controls={false}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "auto",
          borderRadius: "36px",
          overflow: 'hidden'
        }}>
      </ReactPlayer>
    </Theme>
    
  );
};

export default VideoPlayer;