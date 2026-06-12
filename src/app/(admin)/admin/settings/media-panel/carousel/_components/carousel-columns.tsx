"use client";

import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { CarouselDeleteDialog } from "./carousel-delete-dialog";

export type CarouselRow = {
  id: string;
  title: string | null;
  imageUrl: string;
  durationSec: number;
  sortOrder: number;
  isActive: boolean;
};

export const carouselColumns: ColumnDef<CarouselRow>[] = [
  {
    accessorKey: "imageUrl",
    header: "Preview",

    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl}
        alt=""
        width={120}
        height={70}
        className="h-16 w-28 rounded-md object-cover"
      />
    ),
  },

  {
    accessorKey: "title",
    header: "Title",

    cell: ({ row }) =>
      row.original.title || "-",
  },

  {
    accessorKey: "durationSec",
    header: "Duration",

    cell: ({ row }) =>
      `${row.original.durationSec} sec`,
  },

  {
    accessorKey: "isActive",
    header: "Status",

    cell: ({ row }) =>
      row.original.isActive
        ? "Active"
        : "Inactive",
  },
  {
  id: "actions",
  header: "Actions",

  cell: ({ row }) => (
    <div className="flex gap-2">
      <CarouselDeleteDialog
        id={row.original.id}
      />
    </div>
  ),
}
];