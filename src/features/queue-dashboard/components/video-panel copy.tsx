"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CPRAlert } from "./cpr-alert";

type Props = { isCPR: boolean; currentVideo?: { youtubeId: string } };

export function VideoPanel({ isCPR, currentVideo }: Props) {
  return (
    <section className="w-[30%] flex flex-col shrink-0">
      <Card className="h-full bg-card border-border flex flex-col overflow-hidden">
        <CardContent className="flex-1 p-3 pt-0">
          <div className="w-full h-full bg-black rounded-lg overflow-hidden relative border border-slate-950">
            {isCPR ? (
              <CPRAlert />
            ) : currentVideo?.youtubeId ? (
              <iframe
                key={currentVideo.youtubeId}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentVideo.youtubeId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white">
                Loading video...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
