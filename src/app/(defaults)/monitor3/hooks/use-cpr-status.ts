"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket-client";

export function useCprStatus() {
  const [isCPR, setIsCPR] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch(
        "/api/settings/media-panel/cpr",
      );

      const data = await response.json();

      setIsCPR(data.isCprActive);
    };

    fetchStatus();

    const interval = setInterval(
      fetchStatus,
      5000,
    );

    socket.on(
      "cpr-status-change",
      (data: { isCprActive: boolean }) => {
        setIsCPR(data.isCprActive);
      },
    );

    return () => {
      clearInterval(interval);
      socket.off("cpr-status-change");
    };
  }, []);

  return {
    isCPR,
  };
}