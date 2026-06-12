"use client";

import { useMemo } from "react";

import MonitorHeader from "./monitor-header";
import MonitorFooter from "./monitor-footer";
import { CurrentPatientPanel } from "./current-patient-panel";
import { DisplayRouter } from "./display-router";

import { useCprStatus } from "../hooks/use-cpr-status";
import { useCarouselStatus } from "../hooks/use-carousel-status";
import { useCarouselImages } from "../hooks/use-carousel-images";
import { useTvPlaylist } from "../hooks/use-tv-playlist";
import { useVideoRotation } from "../hooks/use-video-rotation";
import {
  useYoutubeSetting,
  useYoutubeSettingStream,
} from "../hooks/use-youtube-setting";
import { useFooterMessage } from "@/app/(defaults)/display1/_components/hook/use-footer-message";
import { useDisplayMode } from "../hooks/use-display-mode";

type CarouselImage = {
  id: string;
  imageUrl: string;
  title?: string | null;
  durationSec: number;
};

type Props = {
  initialCarouselImages?: CarouselImage[];
};

export function DisplayClient({ initialCarouselImages = [] }: Props) {
  // =========================
  // 🔧 SETTINGS
  // =========================
  const { data: youtubeSetting } = useYoutubeSetting();
  useYoutubeSettingStream();

  // =========================
  // 🚨 SYSTEM STATUS
  // =========================
  const { isCPR } = useCprStatus();
  const { isCarousel } = useCarouselStatus();

  // =========================
  // 🖼 CAROUSEL (Socket-driven source of truth)
  // =========================
  const { images: clientImages } = useCarouselImages();

  const carouselImages = useMemo(() => {
    return clientImages.length > 0 ? clientImages : initialCarouselImages;
  }, [clientImages, initialCarouselImages]);

  // =========================
  // 🎬 PLAYLIST
  // =========================
  const { data: playlist = [] } = useTvPlaylist();

  const activeVideos = useMemo(() => {
    return playlist
      .filter((v) => v.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [playlist]);

  const { currentVideo, nextVideo } = useVideoRotation(activeVideos);

  // =========================
  // 🧾 FOOTER
  // =========================
  const footerMessages = useFooterMessage().data ?? [];

  // =========================
  // 🎯 DISPLAY MODE ENGINE
  // =========================
  const mode = useDisplayMode({
    isCPR,
    isCarousel,
    hasVideo: Boolean(currentVideo?.youtubeId),
  });

  // =========================
  // 🎥 MEDIA PROPS (stable ref)
  // =========================
  const mediaProps = useMemo(
    () => ({
      currentVideo,
      onVideoEnd: nextVideo,
      muted: youtubeSetting?.muted ?? false,
      volume: youtubeSetting?.volume ?? 0.5,
    }),
    [currentVideo, nextVideo, youtubeSetting?.muted, youtubeSetting?.volume],
  );

  // =========================
  // UI
  // =========================
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-white flex flex-col">
      <MonitorHeader />

      <main className="flex-1 min-h-0 p-3 grid grid-cols-[42%_58%] gap-3">
        {/* LEFT PANEL */}
        <section className="rounded-2xl overflow-hidden">
          <DisplayRouter
            mode={mode}
            carouselImages={carouselImages}
            mediaProps={mediaProps}
          />
        </section>

        {/* RIGHT PANEL */}
        <section className="rounded-2xl overflow-hidden">
          <CurrentPatientPanel />
        </section>
      </main>

      <MonitorFooter messages={footerMessages} />
    </div>
  );
}
