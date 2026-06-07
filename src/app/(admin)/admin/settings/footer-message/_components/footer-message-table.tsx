"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteDialog } from "./delete-dialog";
import { FooterMessageDialog } from "./footer-message-dialog";
import { SortableRow } from "./sortable-row";
import { reorderFooterMessages } from "../footer-message.actions";
import { toast } from "sonner";
import type { FooterMessage } from "@prisma/client";

interface FooterMessagesTableProps {
  initialData: FooterMessage[];
}

export function FooterMessagesTable({ initialData }: FooterMessagesTableProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<FooterMessage[]>(initialData);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync when server re-fetches and passes new initialData
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<FooterMessage | null>(null);
  const [deleteItem, setDeleteItem] = useState<FooterMessage | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns: ColumnDef<FooterMessage>[] = [
    { accessorKey: "title" },
    { accessorKey: "message" },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      const title = (row.original.title ?? "").toLowerCase();
      const message = row.original.message.toLowerCase();
      return title.includes(search) || message.includes(search);
    },
  });

  const filteredRows = table.getRowModel().rows;
  const filteredIds = filteredRows.map((r) => r.original.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Compute new order outside of setState updater
    const oldIndex = data.findIndex((item) => item.id === active.id);
    const newIndex = data.findIndex((item) => item.id === over.id);
    const prev = data;
    const next = arrayMove(prev, oldIndex, newIndex).map((item, i) => ({
      ...item,
      sortOrder: i,
    }));

    // Optimistic update
    setData(next);

    // Sync to server (startTransition must NOT be called inside setState updater)
    startTransition(async () => {
      const result = await reorderFooterMessages(
        next.map(({ id, sortOrder }) => ({ id, sortOrder }))
      );
      if (!result.success) {
        toast.error("เรียงลำดับไม่สำเร็จ");
        setData(prev); // rollback
      }
    });
  }

  function handleEdit(item: FooterMessage) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleDelete(item: FooterMessage) {
    setDeleteItem(item);
    setDeleteDialogOpen(true);
  }

  function handleDialogClose(open: boolean) {
    setDialogOpen(open);
    if (!open) setEditItem(null);
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหา..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          onClick={() => {
            setEditItem(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          เพิ่ม Footer Text
        </Button>
      </div>

      {/* Table — DndContext must wrap the whole table, NOT be inside <table> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        id="footer-dnd"
      >
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="w-10 px-3 py-3" />
                  <th className="w-12 px-2 py-3 text-center text-xs font-medium text-muted-foreground">
                    ลำดับ
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                    ชื่อ / ข้อความ
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                    สถานะ
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                    ช่วงเวลา
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-muted-foreground">
                    เปิด/ปิด
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <SortableContext
                items={mounted ? filteredIds : []}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-16 text-center text-muted-foreground text-sm"
                      >
                        ไม่พบข้อมูล
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row) => (
                      <SortableRow
                        key={row.original.id}
                        item={row.original}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </tbody>
              </SortableContext>
            </table>
          </div>

          {data.length > 0 && (
            <div className="px-4 py-2.5 border-t bg-muted/30 text-xs text-muted-foreground">
              {filteredRows.length !== data.length
                ? `แสดง ${filteredRows.length} จาก ${data.length} รายการ`
                : `${data.length} รายการ`}
            </div>
          )}
        </div>
      </DndContext>

      {/* Dialogs */}
      <FooterMessageDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        editItem={editItem}
        onSuccess={() => router.refresh()}
      />

      {deleteItem && (
        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          id={deleteItem.id}
          title={deleteItem.title ?? deleteItem.message.slice(0, 40)}
          onSuccess={() => router.refresh()}
        />
      )}
    </>
  );
}