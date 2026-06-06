"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTvPlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; youtubeId: string }) => {
      const res = await fetch("/api/tv-playlist", {
        method: "POST",

        body: JSON.stringify(data),
      });

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tv-playlist"],
      });
    },
  });
}
