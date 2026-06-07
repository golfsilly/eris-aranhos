"use client";

import Marquee from "react-fast-marquee";

type Props = {
  messages: { id: string; message: string }[];
};

export default function MonitorFooter({ messages }: Props) {
  return (
    <footer className="h-10 bg-slate-950 border-t border-slate-900 flex items-center overflow-hidden">
      <div className="flex-1">
        <Marquee speed={50} gradient={false} pauseOnHover={false}>
          <div className="flex gap-16 px-10 text-slate-300 text-sm font-medium">
            {messages.map((m) => (
              <span key={m.id}>{m.message}</span>
            ))}
          </div>
        </Marquee>
      </div>
    </footer>
  );
}
