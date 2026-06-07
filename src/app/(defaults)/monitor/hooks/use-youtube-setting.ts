import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getYoutubeSetting } from "@/app/(admin)/admin/settings/media-panel/youtube/actions/youtube-setting";
import { youtubeSettingKeys } from "@/app/(admin)/admin/settings/media-panel/youtube/hooks/use-youtube-setting";

export function useYoutubeSetting(options?: { refetchInterval?: number }) {
  return useQuery({
    queryKey: youtubeSettingKeys.all,
    queryFn: getYoutubeSetting,
    refetchInterval: options?.refetchInterval ?? false,
  });
}

export function useYoutubeSettingStream() {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const es = new EventSource("/api/youtube-setting/stream");

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      queryClient.setQueryData(youtubeSettingKeys.all, data);
    };

    es.onerror = () => es.close();

    return () => es.close();
  }, [queryClient]);
}

