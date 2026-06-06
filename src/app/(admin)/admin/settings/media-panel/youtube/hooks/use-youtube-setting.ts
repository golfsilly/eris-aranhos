"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getYoutubeSetting,
  updateYoutubeSetting,
} from "../actions/youtube-setting";

export const youtubeSettingKeys = {
  all: ["youtube-setting"] as const,
};

export function useYoutubeSetting(options?: { refetchInterval?: number }) {
  return useQuery({
    queryKey: youtubeSettingKeys.all,
    queryFn: getYoutubeSetting,
    refetchInterval: options?.refetchInterval ?? false,  
  });
}

export function useUpdateYoutubeSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateYoutubeSetting,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: youtubeSettingKeys.all,
      });

      const previous = queryClient.getQueryData(
        youtubeSettingKeys.all,
      );

      queryClient.setQueryData(
        youtubeSettingKeys.all,
        (old: any) => ({
          ...old,
          ...newData,
        }),
      );

      return { previous };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        youtubeSettingKeys.all,
        context?.previous,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: youtubeSettingKeys.all,
      });
    },
  });
}