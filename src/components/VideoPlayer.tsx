"use client";
import { Loader } from 'lucide-react';
import { useState, useRef, useEffect, ChangeEventHandler, ChangeEvent } from 'react';

type VideoPlayerProps = {
  videoSource: string;
  onVideoLoad?: () => void;
  onVideoLoadDone?: () => void;
  onVideoEnd?: () => void;
  onVideoStart?: () => void;
};

const VideoPlayer = ({ videoSource, onVideoLoad, onVideoLoadDone, onVideoEnd, onVideoStart }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle play/pause
  const togglePlayPause = () => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: { target: { value: any; }; }) => {
    if (videoRef.current) {
      const newVolume = e.target.value;
      setVolume(+newVolume);
      videoRef.current.volume = +newVolume;

      setIsMuted(videoRef.current.volume === 0.00);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef?.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
      } else {
        videoRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }

  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (videoRef?.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      const progress = (currentTime / duration) * 100;

      if(isNaN(progress))
        setProgress(0);
      else
        setProgress(progress);
    }

  };

  // Seek video
  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoRef?.current) {
      const seekTime = (+e.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
    }
  };

  // Handle video loaded
  const handleLoadedData = () => {
    if(onVideoLoadDone) {
      onVideoLoadDone();
    }
    setIsLoading(false);
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: { key: any; }) => {
      switch (e.key) {
        case ' ':
          togglePlayPause();
          break;
        case 'm':
          toggleMute();
          break;
        case 'ArrowRight':
          if (videoRef.current)
            videoRef.current.currentTime += 5;
          break;
        case 'ArrowLeft':
          if (videoRef.current)
            videoRef.current.currentTime -= 5;
          break;
        case 'ArrowUp':
          setVolume(Math.min(volume + 0.1, 1));
          break;
        case 'ArrowDown':
          setVolume(Math.max(volume - 0.1, 0));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, volume]);

  return (
    <div className="flex flex-col justify-end w-full h-full mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Video Container - Fixed aspect ratio */}
      <div className="relative bg-black pt-[62.25%]">
        <div className="absolute inset-0 flex justify-center items-center ">
          {isLoading && (
            <Loader className="animate-spin" />
          )}
          
          <video
            ref={videoRef}
            src={videoSource}
            className={`w-full h-full ${isLoading ? 'hidden' : 'block'}`}
            onLoadedData={handleLoadedData}
            onWaiting={() => {
              if(onVideoLoad) {
                onVideoLoad();
              }
              setIsLoading(true);
            }}
            onPlaying={() => {
              if(onVideoLoadDone) {
                onVideoLoadDone();
              }
              setIsLoading(false);
            }}
            onTimeUpdate={handleTimeUpdate}
            muted={isMuted}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-2 bg-gray-900">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-900 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="text-white hover:text-blue-400 focus:outline-none"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Volume Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="text-white hover:text-blue-400 focus:outline-none"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : volume > 0.01 ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 011.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;