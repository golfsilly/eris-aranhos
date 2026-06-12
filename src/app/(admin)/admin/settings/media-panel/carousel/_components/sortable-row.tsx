"use client";

import { CSS } from "@dnd-kit/utilities";

import {
  useSortable,
} from "@dnd-kit/sortable";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { flexRender } from "@tanstack/react-table";

import { GripVertical } from "lucide-react";

type Props = {
  row: any;
};

export function SortableRow({
  row,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: row.original.id,
  });

  // Stable describedBy id to avoid SSR/client hydration mismatches
  const describedBy = `DndDescribedBy-${row.original.id}`;

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform:
          CSS.Transform.toString(
            transform
          ),
        transition,
      }}
    >
      <TableCell className="w-10">
        <button
          {...attributes}
          aria-describedby={describedBy}
          {...listeners}
          className="cursor-grab"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </TableCell>

      {row
        .getVisibleCells()
        .map((cell: any) => (
          <TableCell
            key={cell.id}
          >
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </TableCell>
        ))}
    </TableRow>
  );
}