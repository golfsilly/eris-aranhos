"use client";

import MonitorHeader from "./monitor-header";
import MonitorFooter from "./monitor-footer";
import { VideoPanel } from "./video-panel";
import { useCprStatus } from "../hooks/use-cpr-status";
import { useCarouselStatus } from "../hooks/use-carousel-status";
import { useVideoRotation } from "../hooks/use-video-rotation";
import { useTvPlaylist } from "../hooks/use-tv-playlist";
import { useYoutubeSetting } from "@/app/(admin)/admin/settings/media-panel/youtube/hooks/use-youtube-setting";

export function DisplayClient() {
 const { data: setting } = useYoutubeSetting({ refetchInterval: 3000 });
  const { isCPR } = useCprStatus();
  const { isCarousel } = useCarouselStatus();

  const playlistQuery = useTvPlaylist();

  const activeVideos = (playlistQuery.data ?? [])
    .filter((video) => video.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const { currentVideo, nextVideo } = useVideoRotation(activeVideos);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
      <MonitorHeader />

      <main className="flex flex-1 gap-4 overflow-hidden p-4">
        <VideoPanel
          isCPR={isCPR}
          isCarousel={isCarousel}
          currentVideo={currentVideo}
          onVideoEnd={nextVideo}
          muted={setting?.muted ?? false}
          volume={setting?.volume ?? 0.5}
        />
      </main>

      <MonitorFooter />
    </div>
  );
}
