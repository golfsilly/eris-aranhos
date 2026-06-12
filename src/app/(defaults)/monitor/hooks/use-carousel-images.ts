"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket-client";

export type CarouselImage = {
  id: string;
  imageUrl: string;
  title?: string | null;
  durationSec: number;
};

export function useCarouselImages() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 prevent race condition / stale update
  const abortRef = useRef(false);

  // =========================
  // FETCH FUNCTION (stable)
  // =========================
  const fetchImages = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        "/api/settings/media-panel/carousel/cloudinary",
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`Fetch error: ${res.status}`);
      }

      const data = await res.json();

      if (!abortRef.current) {
        setImages(Array.isArray(data) ? data : []);
        setError(null);
      }
    } catch (err: unknown) {
      if (!abortRef.current) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setImages([]);
      }
    } finally {
      if (!abortRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  // =========================
  // INIT + SOCKET SYNC
  // =========================
useEffect(() => {
  const onUpdate = () => {
    void fetchImages();
  };

  socket.on("carousel-updated", onUpdate);
  socket.on("carousel-status-change", onUpdate);

  return () => {
    socket.off("carousel-updated", onUpdate);
    socket.off("carousel-status-change", onUpdate);
  };
}, [fetchImages]);

  // =========================
  // MANUAL REFRESH API
  // =========================
  const refresh = useCallback(async () => {
    await fetchImages();
  }, [fetchImages]);

  return {
    images,
    isLoading,
    error,
    refresh,
  };
}