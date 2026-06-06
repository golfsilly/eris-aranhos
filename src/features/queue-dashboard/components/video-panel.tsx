"use client";

import { Card, CardContent } from "@/components/ui/card";
import ReactPlayer from "react-player";
import { CPRAlert } from "./cpr-alert";
import { VideoLoading } from "./video-loading";
import { CarouselPicture } from "./carousel-picture";

type Props = {
  isCPR: boolean;
  isCarousel: boolean;
  currentVideo?: {
    youtubeId: string;
  };
  muted: boolean;
  volume: number;
};

export function VideoPanel({
  isCPR,
  isCarousel,
  currentVideo,
  muted,
  volume,
}: Props) {
  const renderContent = () => {
    // Priority 1
    if (isCPR) {
      return <CPRAlert />;
    }

    // Priority 2
    if (isCarousel) {
      return <CarouselPicture />;
    }

    // Default
    if (currentVideo?.youtubeId) {
      return (
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
          playing
          loop
          muted={muted}
          volume={volume}
          width="100%"
          height="100%"
        />
      );
    }

    return <VideoLoading />;
  };

  return (
    <section className="w-[30%] flex flex-col shrink-0">
      <Card className="h-full bg-background border-slate-800 flex flex-col overflow-hidden">
        <CardContent className="flex-1 p-3 pt-0">
          <div className="w-full h-full bg-black rounded-lg overflow-hidden relative border border-slate-950">
            {renderContent()}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
