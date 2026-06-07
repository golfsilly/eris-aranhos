"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { useTransition } from "react";

import { toast } from "sonner";
import type { FooterMessage } from "@prisma/client";
import { toggleFooterMessageActive } from "../footer-message.actions";

interface SortableRowProps {
  item: FooterMessage;
  onEdit: (item: FooterMessage) => void;
  onDelete: (item: FooterMessage) => void;
}

export function SortableRow({ item, onEdit, onDelete }: SortableRowProps) {
  const [isPending, startTransition] = useTransition();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function handleToggle(checked: boolean) {
    startTransition(async () => {
      const result = await toggleFooterMessageActive(item.id, checked);
      if (!result.success) toast.error(result.error ?? "เกิดข้อผิดพลาด");
    });
  }

  const now = new Date();
  const isExpired = item.endAt && new Date(item.endAt) < now;
  const isScheduled = item.startAt && new Date(item.startAt) > now;

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        "border-b transition-colors hover:bg-muted/40",
        isDragging && "opacity-50 bg-muted z-50 shadow-lg"
      )}
    >
      {/* Drag handle */}
      <td className="w-10 px-3 py-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </td>

      {/* Sort order */}
      <td className="w-12 px-2 py-3 text-center text-sm text-muted-foreground">
        {item.sortOrder + 1}
      </td>

      {/* Title / Message */}
      <td className="px-3 py-3 max-w-xs">
        {item.title && (
          <p className="font-medium text-sm truncate">{item.title}</p>
        )}
        <p
          className={cn(
            "text-sm text-muted-foreground truncate",
            !item.title && "text-foreground font-medium"
          )}
        >
          {item.message}
        </p>
      </td>

      {/* Status badges */}
      <td className="px-3 py-3 whitespace-nowrap">
        <div className="flex flex-wrap gap-1.5">
          {isExpired && (
            <Badge variant="secondary" className="text-xs">
              หมดอายุ
            </Badge>
          )}
          {isScheduled && !isExpired && (
            <Badge
              variant="outline"
              className="text-xs border-blue-300 text-blue-600"
            >
              กำหนดเวลา
            </Badge>
          )}
          {!isExpired && !isScheduled && item.isActive && (
            <Badge className="text-xs bg-emerald-100 text-emerald-700 border-0">
              ใช้งาน
            </Badge>
          )}
        </div>
      </td>

      {/* Date range */}
      <td className="px-3 py-3 whitespace-nowrap text-xs text-muted-foreground">
        {item.startAt && (
          <div>
            {format(new Date(item.startAt), "d MMM yy HH:mm", { locale: th })}
          </div>
        )}
        {item.endAt && (
          <div className="text-muted-foreground/60">
            → {format(new Date(item.endAt), "d MMM yy HH:mm", { locale: th })}
          </div>
        )}
        {!item.startAt && !item.endAt && (
          <span className="text-muted-foreground/40">—</span>
        )}
      </td>

      {/* Toggle */}
      <td className="px-3 py-3 text-center">
        <Switch
          checked={item.isActive}
          onCheckedChange={handleToggle}
          disabled={isPending}
          aria-label="Toggle active"
        />
      </td>

      {/* Actions */}
      <td className="px-3 py-3 text-right">
        <div className="flex justify-end gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => onEdit(item)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(item)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}