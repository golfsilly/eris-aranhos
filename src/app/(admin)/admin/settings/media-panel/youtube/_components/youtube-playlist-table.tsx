"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { PlaylistItem } from "./youtube-playlist-columns";

interface YoutubePlaylistTableProps {
  columns: ColumnDef<PlaylistItem>[];
  data: PlaylistItem[];
  isDragDisabled?: boolean;
}

export function YoutubePlaylistTable({
  columns,
  data,
  isDragDisabled = false,
}: YoutubePlaylistTableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            {!isDragDisabled && <th className="w-[50px] p-4 text-center"></th>}
            {columns.map((col: any) => (
              <th
                key={col.id || col.accessorKey}
                className="p-4 text-left font-medium text-muted-foreground"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((item) => (
            <SortableRow
              key={item.id}
              item={item}
              columns={columns}
              isDragDisabled={isDragDisabled}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortableRow({
  item,
  columns,
  isDragDisabled,
}: {
  item: PlaylistItem;
  columns: ColumnDef<PlaylistItem>[];
  isDragDisabled: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: isDragDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 30 : "auto",
    position: isDragging ? ("relative" as const) : undefined,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`hover:bg-muted/50 transition-colors bg-card ${
        isDragging ? "shadow-md dark:bg-muted/20" : ""
      }`}
    >
      {!isDragDisabled && (
        <td className="p-4 text-center align-middle">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground inline-flex items-center justify-center transition-colors touch-none"
          >
            <GripVertical className="w-4 h-4" />
          </button>
        </td>
      )}

      {columns.map((col: any) => {
        return (
          <td key={col.id || col.accessorKey} className="p-4 align-middle">
            {col.cell
              ? col.cell({
                  row: {
                    original: item,
                    index: item.sortOrder,
                    id: item.id,
                  },
                })
              : (item[col.accessorKey as keyof PlaylistItem] as React.ReactNode)}
          </td>
        );
      })}
    </tr>
  );
}