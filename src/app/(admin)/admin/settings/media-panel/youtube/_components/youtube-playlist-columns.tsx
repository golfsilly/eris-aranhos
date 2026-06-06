"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

export type PlaylistItem = {
  id: string;
  title: string;
  youtubeId: string;
  isActive: boolean;
  sortOrder: number;
};

type Props = {
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean) => void;
};

export const getColumns = ({
  onDelete,
  onToggle,
}: Props): ColumnDef<PlaylistItem>[] => [
  {
    accessorKey: "sortOrder",
    header: "ลำดับ",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  },
  { accessorKey: "title", header: "ชื่อ" },
  { accessorKey: "youtubeId", header: "YouTube ID" },
  {
    id: "preview",
    header: "Preview",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Image
          className="w-32 rounded-md object-cover aspect-video border bg-muted"
          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt={item.title}
          width={128}
          height={72}
        />
      );
    },
  },
  {
    id: "active",
    header: "เปิดใช้",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Switch
          checked={item.isActive}
          onCheckedChange={(checked) => onToggle(item.id, checked)}
        />
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      );
    },
  },
];