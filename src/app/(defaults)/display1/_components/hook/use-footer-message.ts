import { useQuery } from "@tanstack/react-query";

export type FooterMessage = {
  id: string;
  message: string;
};

async function fetchFooterMessages(): Promise<FooterMessage[]> {
  const res = await fetch("/api/footer-message");
  if (!res.ok) throw new Error("Failed to fetch footer messages");
  return res.json();
}

export function useFooterMessage() {
  return useQuery({
    queryKey: ["footer-message"],
    queryFn: fetchFooterMessages,
    refetchInterval: 10000, 
  });
}
