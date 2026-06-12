import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getYoutubeSetting } from "@/app/(admin)/admin/settings/media-panel/youtube/actions/youtube-setting";
import { youtubeSettingKeys } from "@/app/(admin)/admin/settings/media-panel/youtube/hooks/use-youtube-setting";


// =========================
// QUERY (unchanged, clean)
// =========================
export function useYoutubeSetting(options?: { refetchInterval?: number }) {
  return useQuery({
    queryKey: youtubeSettingKeys.all,
    queryFn: getYoutubeSetting,
    refetchInterval: options?.refetchInterval ?? false,
  });
}


// =========================
// SSE STREAM (FIXED)
// =========================
export function useYoutubeSettingStream() {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    let isMounted = true;
    let es: EventSource | null = null;

    const connect = () => {
      es = new EventSource("/api/youtube-setting/stream");

      es.onmessage = (event) => {
        if (!isMounted) return;

        try {
          const data = JSON.parse(event.data);

          queryClient.setQueryData(
            youtubeSettingKeys.all,
            data
          );
        } catch (err) {
          console.warn("Invalid SSE data", err);
        }
      };

      es.onerror = (err) => {
        console.warn("SSE error (will reconnect):", err);

        // IMPORTANT:
        // close current connection to avoid zombie loops
        es?.close();

        // optional: retry with backoff
        if (isMounted) {
          setTimeout(connect, 2000);
        }
      };
    };

    connect();

    return () => {
      isMounted = false;
      es?.close();
    };
  }, [queryClient]);
}