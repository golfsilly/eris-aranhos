"use client";

import MonitorHeader from "./monitor-header";
import MonitorFooter from "./monitor-footer";
import { VideoPanel } from "./video-panel";
import { CurrentPatientPanel } from "./panel2/current-patient-panel";
import { WaitingPatientPanel } from "./panel2/waiting-patient-panel";
import { useCprStatus } from "../hooks/use-cpr-status";
import { useCarouselStatus } from "../hooks/use-carousel-status";
import { useVideoRotation } from "../hooks/use-video-rotation";
import { useTvPlaylist } from "../hooks/use-tv-playlist";
import {
  useYoutubeSetting,
  useYoutubeSettingStream,
} from "../hooks/use-youtube-setting";
import { useFooterMessage } from "@/hooks/use-footer-message";

export function DisplayClient() {
  const { data: setting } = useYoutubeSetting();
  useYoutubeSettingStream();

  const { isCPR } = useCprStatus();
  const { isCarousel } = useCarouselStatus();
  const playlistQuery = useTvPlaylist();
  const footerQuery = useFooterMessage();

  const activeVideos = (playlistQuery.data ?? [])
    .filter((video) => video.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const { currentVideo, nextVideo } = useVideoRotation(activeVideos);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
      <MonitorHeader />

      <main className="flex-1 px-2 py-3 overflow-hidden">
        <div
          className="grid h-full gap-3"
          style={{
            gridTemplateColumns: "30% 40% 25%",
          }}
        >
          <div className="h-full overflow-hidden rounded-2xl">
            <VideoPanel
              isCPR={isCPR}
              isCarousel={isCarousel}
              currentVideo={currentVideo}
              onVideoEnd={nextVideo}
              muted={setting?.muted ?? false}
              volume={setting?.volume ?? 0.5}
            />
          </div>

          <div className="h-full overflow-hidden rounded-2xl">
            <CurrentPatientPanel />
          </div>

          <div className="h-full overflow-hidden rounded-2xl">
            <WaitingPatientPanel />
          </div>
        </div>
      </main>

      <MonitorFooter messages={footerQuery.data ?? []} />
    </div>
  );
}