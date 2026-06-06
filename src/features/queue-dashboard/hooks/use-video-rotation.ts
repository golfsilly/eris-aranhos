"use client";

import { useEffect, useMemo, useState } from "react";

type Video = {
  youtubeId: string;
  isActive: boolean;
};

export function useVideoRotation(videos: Video[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeVideos = useMemo(
    () => videos.filter((video) => video.isActive),
    [videos]
  );

  useEffect(() => {
    if (currentIndex >= activeVideos.length) {
      setCurrentIndex(0);
    }
  }, [activeVideos.length, currentIndex]);
  

  useEffect(() => {
    if (activeVideos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeVideos.length);
    }, 1000 * 60 * 3);

    return () => clearInterval(interval);
  }, [activeVideos.length]);

  const currentVideo =
    activeVideos.length > 0 ? activeVideos[currentIndex] : undefined;
    
  return {
    activeVideos,
    currentVideo,
  };
}