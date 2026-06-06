"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section>
      {backToTopButton && (
        <Button
          className="fixed animate-bounce bottom-3.5 right-3.5 z-50 flex w-10 h-10 rounded-full  bg-violet-500 p-3 text-gray-100"
          onClick={scrollup}
        >
          <ChevronUp className="" />
        </Button>
      )}
    </section>
  );
}
