"use client";

import { Card, CardContent } from "@/components/ui/card";
import ReactPlayer from "react-player";
import { CPRAlert } from "./cpr-alert";
import { Loader2, Video } from "lucide-react";
import { VideoLoading } from "./video-loading";

type Props = {
  isCPR: boolean;
  currentVideo?: { youtubeId: string };
  muted: boolean;
  volume: number; // 0 - 1
};

export function VideoPanel({ isCPR, currentVideo, muted, volume }: Props) {
  return (
    <section className="w-[30%] flex flex-col shrink-0">
      <Card className="h-full bg-card border-slate-800 flex flex-col overflow-hidden">
        <CardContent className="flex-1 p-3 pt-0">
          <div className="w-full h-full bg-black rounded-lg overflow-hidden relative border border-slate-950">
            {!isCPR && currentVideo?.youtubeId ? (
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
                playing
                loop
                muted={muted}
                volume={volume}
                width="100%"
                height="100%"
              />
            ) : (
              <VideoLoading />
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

