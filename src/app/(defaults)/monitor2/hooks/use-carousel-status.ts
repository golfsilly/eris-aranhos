"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket-client";

export function useCarouselStatus() {
  const [isCarousel, setIsCarousel] =
    useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch(
        "/api/settings/media-panel/carousel",
      );

      const data = await response.json();

      setIsCarousel(
        data.isCarouselActive,
      );
    };

    fetchStatus();

    const interval = setInterval(
      fetchStatus,
      5000,
    );

    socket.on(
      "carousel-status-change",
      (
        data: {
          isCarouselActive: boolean;
        },
      ) => {
        setIsCarousel(
          data.isCarouselActive,
        );
      },
    );

    return () => {
      clearInterval(interval);
      socket.off(
        "carousel-status-change",
      );
    };
  }, []);

  return {
    isCarousel,
  };
}