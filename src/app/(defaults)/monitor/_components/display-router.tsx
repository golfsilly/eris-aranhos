"use client";

import { CPRAlert } from "./video-panel/cpr-alert";
import { CarouselDisplay } from "./video-panel/carousel-display";
import { YoutubePlayList } from "./video-panel/youtube-playlist";

type CarouselImage = {
  id: string;
  imageUrl: string;
  title?: string | null;
  durationSec: number;
};

type DisplayRouterProps = {
  mode: string;
  mediaProps?: {
    currentVideo?: { youtubeId: string } | undefined;
    onVideoEnd?: () => void;
    muted?: boolean;
    volume?: number;
  };
  carouselImages?: CarouselImage[];
};

export function DisplayRouter({
  mode,
  mediaProps,
  carouselImages,
}: DisplayRouterProps) {

  switch (mode) {
    case "CPR":
      return <CPRAlert />;

    case "CAROUSEL":
      return <CarouselDisplay images={carouselImages ?? []} />;

    case "YOUTUBE":
      return (
        <YoutubePlayList
          currentVideo={mediaProps?.currentVideo}
          onVideoEnd={mediaProps?.onVideoEnd ?? (() => {})}
          muted={mediaProps?.muted ?? false}
          volume={mediaProps?.volume ?? 0.5}
        />
      );

    default:
      return null;
  }
}