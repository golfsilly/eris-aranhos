"use client";

import { useState, useEffect } from "react";
import { PublicHeader } from "@/features/queue-dashboard/components/public-header";
import { VideoPanel } from "@/features/queue-dashboard/components/video-panel";

import { useVideoRotation } from "@/features/queue-dashboard/hooks/use-video-rotation";
import DashboardFooter from "@/features/queue-dashboard/components/public-footer";
import { socket } from "@/lib/socket-client";
import { useTvPlaylist } from "@/app/(admin)/admin/settings/media-panel/youtube/_components/use-youtube-playlist";

export default function QueueDisplay() {
  const [isCPR, setIsCPR] = useState(false);
  const [isCarousel, setIsCarousel] = useState(false);

  useEffect(() => {
    const fetchCPRStatus = async () => {
      try {
        const response = await fetch("/api/settings/media-panel/cpr");
        const data = await response.json();
        setIsCPR(data.isCprActive);
      } catch (error) {
        console.error("Failed to fetch CPR status:", error);
      }
    };

    // ดึงค่าครั้งแรก
    fetchCPRStatus();

    // ตั้ง polling ทุก 5 วินาที
    const pollInterval = setInterval(fetchCPRStatus, 5000);

    // ฟัง socket event สำหรับ real-time update
    socket.on("cpr-status-change", (data: { isCprActive: boolean }) => {
      setIsCPR(data.isCprActive);
    });

    return () => {
      clearInterval(pollInterval);
      socket.off("cpr-status-change");
    };
  }, []);

  useEffect(() => {
    const fetchCarouselStatus = async () => {
      try {
        const response = await fetch("/api/settings/media-panel/carousel");
        const data = await response.json();
        setIsCarousel(data.isCarouselActive);
      } catch (error) {
        console.error("Failed to fetch Carousel status:", error);
      }
    };

    // ดึงค่าครั้งแรก
    fetchCarouselStatus();

    // ตั้ง polling ทุก 5 วินาที
    const pollInterval = setInterval(fetchCarouselStatus, 5000);

    // ฟัง socket event สำหรับ real-time update
    socket.on(
      "carousel-status-change",
      (data: { isCarouselActive: boolean }) => {
        setIsCarousel(data.isCarouselActive);
      },
    );

    return () => {
      clearInterval(pollInterval);
      socket.off("carousel-status-change");
    };
  }, []);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const query = useTvPlaylist();
  const videos = query.data ?? [];

  const { currentVideo } = useVideoRotation(videos);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-50">
      <PublicHeader />
      <main className="flex flex-1 overflow-hidden p-4 gap-4">
        <VideoPanel
          isCPR={isCPR}
          isCarousel={isCarousel}
          muted={muted}
          volume={volume}
          currentVideo={currentVideo}
        />
        {/* Waiting Panel */} {/* InProgress Panel */}
      </main>
      <DashboardFooter />
    </div>
  );
}
