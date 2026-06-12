"use client";

import ReactPlayer from "react-player";
import { VideoLoading } from "./video-loading";



type Props = {
  isCPR?: boolean;
  isCarousel?: boolean;

  currentVideo:
    | {
        youtubeId: string;
      }
    | undefined;

  onVideoEnd: () => void;

  muted: boolean;
  volume: number;
};

export function YoutubePlayList({
  currentVideo,
  onVideoEnd,
  muted,
  volume,
}: Props) {
  if (!currentVideo?.youtubeId) {
    return <VideoLoading />;
  }

  return (
    <ReactPlayer
      src={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
      playing
      muted={muted}
      volume={volume}
      onEnded={onVideoEnd}
      width="100%"
      height="100%"
    />
  );
}