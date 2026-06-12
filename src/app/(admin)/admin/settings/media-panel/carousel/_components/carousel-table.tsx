"use client";

import * as React from "react";

import { toast } from "sonner";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  carouselColumns,
  CarouselRow,
} from "./carousel-columns";

import { SortableRow } from "./sortable-row";

import { reorderCarouselImages } from "../actions/reorder-carousel-images";

type Props = {
  data: CarouselRow[];
};

export function CarouselTable({
  data,
}: Props) {
  const [rows, setRows] =
    React.useState(data);

  const table = useReactTable({
    data: rows,
    columns: carouselColumns,
    getCoreRowModel:
      getCoreRowModel(),
  });

  async function onDragEnd(
    event: DragEndEvent
  ) {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id)
      return;

    const oldIndex =
      rows.findIndex(
        (item) =>
          item.id === active.id
      );

    const newIndex =
      rows.findIndex(
        (item) =>
          item.id === over.id
      );

    const reordered = arrayMove(
      rows,
      oldIndex,
      newIndex
    );

    setRows(reordered);

    try {
      await reorderCarouselImages(
        reordered.map(
          (item, index) => ({
            id: item.id,
            sortOrder: index,
          })
        )
      );

      toast.success(
        "Updated sort order"
      );
    } catch {
      toast.error(
        "Unable to update order"
      );
    }
  }

  return (
    <div className="rounded-lg border">
      <DndContext
        collisionDetection={
          closestCenter
        }
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={rows.map(
            (item) => item.id
          )}
          strategy={
            verticalListSortingStrategy
          }
        >
          <Table>
            <TableHeader>
              {table
                .getHeaderGroups()
                .map(
                  (headerGroup) => (
                    <TableRow
                      key={
                        headerGroup.id
                      }
                    >
                      <TableHead className="w-10" />

                      {headerGroup.headers.map(
                        (header) => (
                          <TableHead
                            key={
                              header.id
                            }
                          >
                            {flexRender(
                              header
                                .column
                                .columnDef
                                .header,
                              header.getContext()
                            )}
                          </TableHead>
                        )
                      )}
                    </TableRow>
                  )
                )}
            </TableHeader>

            <TableBody>
              {table
                .getRowModel()
                .rows.map((row) => (
                  <SortableRow
                    key={
                      row.original.id
                    }
                    row={row}
                  />
                ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </div>
  );
}