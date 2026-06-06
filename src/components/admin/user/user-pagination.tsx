"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  pageCount: number;
}

export default function UserPagination({
  page,
  pageCount,
}: Props) {
  const router = useRouter();

  const params = useSearchParams();

  const goTo = (newPage: number) => {
    const query = new URLSearchParams(
      params.toString()
    );

    query.set(
      "page",
      String(newPage)
    );

    router.push(
      `?${query.toString()}`
    );
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => goTo(page - 1)}
      >
        ก่อนหน้า
      </Button>

      <span className="text-sm">
        หน้า {page} / {pageCount}
      </span>

      <Button
        variant="outline"
        disabled={page >= pageCount}
        onClick={() => goTo(page + 1)}
      >
        ถัดไป
      </Button>
    </div>
  );
}