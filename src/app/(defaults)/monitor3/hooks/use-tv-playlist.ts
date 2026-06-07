"use client";

import { useQuery } from "@tanstack/react-query";

export type TvPlaylistItem = {
  id: string;
  youtubeId: string;
  title: string;
  duration: number;
  sortOrder: number;
  isActive: boolean;
};

export function useTvPlaylist() {
  return useQuery({
    queryKey: ["tv-playlist"],

    queryFn: async () => {
      const response = await fetch("/api/tv-playlist");

      if (!response.ok) {
        throw new Error("Failed to fetch playlist");
      }

      return response.json() as Promise<TvPlaylistItem[]>;
    },

    refetchInterval: 3000,
    refetchOnWindowFocus: true,
  });
}
