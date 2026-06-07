"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { CPRAlert } from "./video-panel/cpr-alert";
import { CarouselPicture } from "./video-panel/carousel-picture";
import { VideoLoading } from "./video-panel/video-loading";

type Props = {
  isCPR: boolean;
  isCarousel: boolean;

  currentVideo:
    | {
        youtubeId: string;
      }
    | undefined;

  onVideoEnd: () => void;

  muted: boolean;
  volume: number;
};

export function VideoPanel({
  isCPR,
  isCarousel,
  currentVideo,
  onVideoEnd,
  muted,
  volume,
}: Props) {
  let content: React.ReactNode;

  const MAX_RETRIES = 3;
  const RETRY_BASE_DELAY = 2000; // ms

  const [retryKey, setRetryKey] = useState(0);
  const [retries, setRetries] = useState(0);
  const lastVideoRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    // reset retries when video changes
    if (lastVideoRef.current !== currentVideo?.youtubeId) {
      setRetries(0);
      setRetryKey(0);
      lastVideoRef.current = currentVideo?.youtubeId;
    }
  }, [currentVideo?.youtubeId]);

  if (isCPR) {
    content = <CPRAlert />;
  } else if (isCarousel) {
    content = <CarouselPicture />;
  } else if (currentVideo?.youtubeId) {
    const playerKey = `${currentVideo.youtubeId}-${muted ? "m" : "u"}-${Math.round(
      volume * 100,
    )}-${retryKey}`;

    const handleError = () => {
      if (retries < MAX_RETRIES) {
        const next = retries + 1;
        setRetries(next);
        const delay = RETRY_BASE_DELAY * next;
        setTimeout(() => setRetryKey((k) => k + 1), delay);
      } else {
        // give up and skip to next video so display doesn't stop
        onVideoEnd();
      }
    };

    const handlePlay = () => {
      // successful play, reset retry counter
      setRetries(0);
    };

    content = (
      <ReactPlayer
        key={playerKey}
        src={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
        playing
        muted={muted}
        volume={volume}
        width="100%"
        height="100%"
        onEnded={onVideoEnd}
        onError={handleError}
        onPlay={handlePlay}
      />
    );
  } else {
    content = <VideoLoading />;
  }

  return (
    <section className="h-full w-full">
      <div className="h-full w-full overflow-hidden rounded-lg bg-black relative">
        {content}
      </div>
    </section>
  );
}
