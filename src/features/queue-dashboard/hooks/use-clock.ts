"use client";

import { useEffect, useState } from "react";

export function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("th-TH", { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}
