export type DisplayMode =
  | "CPR"
  | "CAROUSEL"
  | "YOUTUBE"
  | "LOADING";

export function useDisplayMode(params: {
  isCPR: boolean;
  isCarousel: boolean;
  hasVideo: boolean;
}): DisplayMode {
  if (params.isCPR) return "CPR";
  if (params.isCarousel) return "CAROUSEL";
  if (params.hasVideo) return "YOUTUBE";
  return "LOADING";
}