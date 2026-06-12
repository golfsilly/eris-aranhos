"use client";

import { useMemo } from "react";
import DisplayHeader from "./display-header";
import DisplayFooter from "./display-footer";
import { DisplayRouter } from "./display-router";
import { useYoutubeSetting, useYoutubeSettingStream } from "./hook/use-youtube-setting";
import { useCprStatus } from "./hook/use-cpr-status";
import { useCarouselStatus } from "./hook/use-carousel-status";
import { useCarouselImages } from "./hook/use-carousel-images";
import { useYoutubePlaylist } from "./hook/use-youtube-playlist";
import { useVideoRotation } from "./hook/use-video-rotation";
import { useFooterMessage } from "@/app/(defaults)/display1/_components/hook/use-footer-message";
import { useDisplayMode } from "./hook/use-display-mode";
import { CurrentPatientPanel } from "../../monitor/_components/current-patient-panel";

// import { CurrentPatientPanel } from "./current-patient-panel";
// import { useCprStatus } from "../hooks/use-cpr-status";
// import { useCarouselStatus } from "../hooks/use-carousel-status";
// import { useCarouselImages } from "../hooks/use-carousel-images";
// import { useTvPlaylist } from "../hooks/use-tv-playlist";
// import { useVideoRotation } from "../hooks/use-video-rotation";
// import { useFooterMessage } from "@/hooks/use-footer-message";
// import { useDisplayMode } from "../hooks/use-display-mode";
// import {
//   useYoutubeSetting,
//   useYoutubeSettingStream,
// } from "../hooks/use-youtube-setting";



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

  const { data: youtubeSetting } = useYoutubeSetting();
  useYoutubeSettingStream();

  const { isCPR } = useCprStatus();
  const { isCarousel } = useCarouselStatus();

  const { images: clientImages } = useCarouselImages();

  const carouselImages = useMemo(() => {
    return clientImages.length > 0 ? clientImages : initialCarouselImages;
  }, [clientImages, initialCarouselImages]);

  const { data: playlist = [] } = useYoutubePlaylist();

  const activeVideos = useMemo(() => {
    return playlist
      .filter((v) => v.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [playlist]);

  const { currentVideo, nextVideo } = useVideoRotation(activeVideos);

  const footerMessages = useFooterMessage().data ?? [];


  const mode = useDisplayMode({
    isCPR,
    isCarousel,
    hasVideo: Boolean(currentVideo?.youtubeId),
  });


  const mediaProps = useMemo(
    () => ({
      currentVideo,
      onVideoEnd: nextVideo,
      muted: youtubeSetting?.muted ?? false,
      volume: youtubeSetting?.volume ?? 0.5,
    }),
    [currentVideo, nextVideo, youtubeSetting?.muted, youtubeSetting?.volume],
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-white flex flex-col">
      <DisplayHeader />

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

      <DisplayFooter messages={footerMessages} />
    </div>
  );
}
