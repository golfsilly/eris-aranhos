import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateYoutubeSetting } from "../actions/youtube-setting";

export function useUpdateYoutubeSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateYoutubeSetting,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["youtube-setting"],
      });
    },
  });
}