import React from "react";
import ComingSoonPage from "@/components/coming-soon";

export default function DashBoard2() {
  const isComingSoon = true;

  if (isComingSoon) {
    return <ComingSoonPage />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold"></h1>
    </div>
  );
}