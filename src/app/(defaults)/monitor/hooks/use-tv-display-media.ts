"use client";

import { useMemo } from "react";

import { useTvPlaylist } from "./use-tv-playlist";
import { useVideoRotation } from "./use-video-rotation";


export function useTvDisplayMedia() {
  const playlistQuery =
    useTvPlaylist();

  const activeVideos = useMemo(() => {
    return (
      playlistQuery.data ?? []
    )
      .filter(
        (video) => video.isActive,
      )
      .sort(
        (a, b) =>
          a.sortOrder - b.sortOrder,
      );
  }, [playlistQuery.data]);

  const { currentVideo } =
    useVideoRotation(activeVideos);

  return {
    currentVideo,
    isLoading:
      playlistQuery.isLoading,
  };
}