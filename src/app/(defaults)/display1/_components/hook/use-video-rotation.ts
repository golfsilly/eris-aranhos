"use client";

import { useMemo, useState, useCallback } from "react";

type VideoItem = {
  id: string;
  youtubeId: string;
};

export function useVideoRotation(
  videos: VideoItem[],
) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const safeIndex = useMemo(() => {
    if (!videos.length) {
      return 0;
    }

    return currentIndex % videos.length;
  }, [currentIndex, videos.length]);

  const currentVideo =
    videos[safeIndex];

  const nextVideo = useCallback(() => {
    if (!videos.length) {
      return;
    }

    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  return {
    currentIndex: safeIndex,
    currentVideo,
    nextVideo,
  };
}