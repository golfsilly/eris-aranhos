"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ProvidersReactQuery({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
    });
  });
  return (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  );
}
