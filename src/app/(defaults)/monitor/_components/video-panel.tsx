"use client";

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

  if (isCPR) {
    content = <CPRAlert />;
  } else if (isCarousel) {
    content = <CarouselPicture />;
  } else if (currentVideo?.youtubeId) {
    content = (
      <ReactPlayer
        key={currentVideo.youtubeId}
        src={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
        playing
        muted={muted}
        volume={volume}
        width="100%"
        height="100%"
        onEnded={onVideoEnd}
      />
    );
  } else {
    content = <VideoLoading />;
  }

  return (
    <section className="w-[30%] shrink-0">
      <div className="h-full w-full overflow-hidden bg-black rounded-lg border border-red-950">
        {content}
      </div>
    </section>
  );
}
