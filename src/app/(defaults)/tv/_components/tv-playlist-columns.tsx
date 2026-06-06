"use client";

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
  onToggle: (id: string, value: boolean) => void;
};
export const getColumns = ({
  onDelete,
  onToggle,
}: Props): ColumnDef<PlaylistItem>[] => [
  { accessorKey: "sortOrder", header: "ลำดับ" },
  { accessorKey: "title", header: "ชื่อ" },
  { accessorKey: "youtubeId", header: "YouTube ID" },
  {
    id: "preview",
    header: "Preview",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <img
          className="w-32 rounded-md"
          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
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
          onCheckedChange={(value) => onToggle(item.id, value)}
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
          {" "}
          <Trash2 className="w-4 h-4" />{" "}
        </Button>
      );
    },
  },
];
