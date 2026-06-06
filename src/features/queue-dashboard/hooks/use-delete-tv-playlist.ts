"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTvPlaylist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/tv-playlist/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("ลบวิดีโอไม่สำเร็จ");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tv-playlist"] });
    },
  });
}
