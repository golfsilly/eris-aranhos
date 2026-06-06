"use client";

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import {
  getPlaylistItems,
  createPlaylistItem,
  deletePlaylistItem,
  togglePlaylistItem,
  updatePlaylistOrder,
} from "./youtube-playlist-actions";

const QUERY_KEY = ["tv-playlist"];

// Hook ดึงข้อมูล Playlist
export function useTvPlaylist(options?: Partial<UseQueryOptions<any>>) {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await getPlaylistItems();
    },
    ...options,
  });
}


// Hook เพิ่มวิดีโอใหม่
export function useCreateTvPlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlaylistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// Hook สำหรับการลากจัดลำดับ (Drag & Drop)
export function useUpdateTvPlaylistOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderedIds: string[]) => updatePlaylistOrder(orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// Hook เปิด/ปิด วิดีโอ
export function useToggleTvPlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      togglePlaylistItem(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// Hook ลบวิดีโอ
export function useDeleteTvPlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePlaylistItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}