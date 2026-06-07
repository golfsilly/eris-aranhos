import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const setting = await prisma.youtubeSetting.findFirst();
      if (setting) send(setting);

      let lastUpdatedAt = setting?.updatedAt?.toISOString();

      const interval = setInterval(async () => {
        try {
          const latest = await prisma.youtubeSetting.findFirst();
          const latestUpdatedAt = latest?.updatedAt?.toISOString();

          if (latest && latestUpdatedAt !== lastUpdatedAt) {
            lastUpdatedAt = latestUpdatedAt;
            send(latest);
          }
        } catch {
          clearInterval(interval);
          controller.close();
        }
      }, 1000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}