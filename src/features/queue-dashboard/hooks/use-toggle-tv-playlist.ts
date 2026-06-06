"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type TogglePayload = {
  id: string;
  isActive: boolean;
};

export function useToggleTvPlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: TogglePayload) => {
      const res = await fetch(`/api/tv-playlist/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          isActive,
        }),
      });

      if (!res.ok) {
        throw new Error("เปลี่ยนสถานะไม่สำเร็จ");
      }

      return res.json();
    },

    // ✅ optimistic update
    onMutate: async ({ id, isActive }) => {
      // หยุด refetch ชั่วคราว
      await queryClient.cancelQueries({
        queryKey: ["tv-playlist"],
      });

      // backup cache เดิม
      const previous = queryClient.getQueryData(["tv-playlist"]);

      // update cache ทันที
      queryClient.setQueryData(["tv-playlist"], (old: any[]) => {
        if (!old) return [];

        return old.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isActive,
            };
          }

          return item;
        });
      });

      return { previous };
    },

    // rollback ถ้า error
    onError: (err, variables, context) => {
      queryClient.setQueryData(["tv-playlist"], context?.previous);
    },

    // sync server
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tv-playlist"],
      });
    },
  });
}
