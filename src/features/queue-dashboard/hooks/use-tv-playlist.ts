"use client";

import { useQuery } from "@tanstack/react-query";
import { getTvPlaylist } from "../api/get-tv-playlist";

export function useTvPlaylist() {
  return useQuery({
    queryKey: ["tv-playlist"],

    queryFn: getTvPlaylist,

    refetchInterval: 1000 * 30, 
  });
}
