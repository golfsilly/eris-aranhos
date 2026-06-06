"use client";

import { useState } from "react";
import { Plus, Search, Tv, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TvPlaylistTable } from "@/app/(defaults)/tv/_components/tv-playlist-table";
import { getColumns } from "@/app/(defaults)/tv/_components/tv-playlist-columns";
import { useTvPlaylist } from "@/features/queue-dashboard/hooks/use-tv-playlist";
import { useCreateTvPlaylist } from "@/features/queue-dashboard/hooks/use-create-tv-playlist";
import { useToggleTvPlaylist } from "@/features/queue-dashboard/hooks/use-toggle-tv-playlist";
import { useDeleteTvPlaylist } from "@/features/queue-dashboard/hooks/use-delete-tv-playlist";

type FilterType = "all" | "active";

interface PlaylistItem {
  id: string;
  title: string;
  youtubeId: string;
  isActive: boolean;
}

// ─── Add Video Dialog ────────────────────────────────────────────────────────
// ✅ FIX: ใช้ uncontrolled dialog (ไม่รับ open/onOpenChange จาก parent)
//         แล้วใช้ DialogTrigger asChild ห่อ Button เพื่อหลีกเลี่ยง button-in-button
function AddVideoDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const createMutation = useCreateTvPlaylist();

  async function handleCreate() {
    if (!title || !youtubeId) return;
    await createMutation.mutateAsync({ title, youtubeId });
    setTitle("");
    setYoutubeId("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ✅ asChild ทำให้ Radix ใช้ <button> ของ Button แทนที่จะสร้างใหม่ครอบ */}
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          เพิ่มวิดีโอ
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <Tv className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            เพิ่มวิดีโอประชาสัมพันธ์
          </DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">ชื่อวิดีโอ</label>
            <Input
              placeholder="เช่น วิธีปฐมพยาบาลเบื้องต้น"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">YouTube Video ID</label>
            <Input
              placeholder="เช่น dQw4w9WgXcQ"
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
            />
            {youtubeId && (
              <div className="overflow-hidden rounded-lg border bg-muted">
                <img
                  src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                  alt="YouTube preview"
                  className="w-full h-36 object-cover"
                />
              </div>
            )}
          </div>

          <Button
            onClick={handleCreate}
            disabled={createMutation.isPending || !title || !youtubeId}
            className="w-full"
          >
            {createMutation.isPending ? "กำลังเพิ่ม..." : "เพิ่มเข้า Playlist"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Search + Filter Bar ─────────────────────────────────────────────────────
interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
  totalCount: number;
  activeCount: number;
}

function SearchFilterBar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  totalCount,
  activeCount,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="ค้นหาชื่อวิดีโอหรือ YouTube ID..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex gap-2 shrink-0">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
          className="gap-1.5"
        >
          ทั้งหมด
          <Badge
            variant={filter === "all" ? "secondary" : "outline"}
            className="text-xs px-1.5 py-0 h-4"
          >
            {totalCount}
          </Badge>
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("active")}
          className="gap-1.5"
        >
          แสดงอยู่
          <Badge
            variant={filter === "active" ? "secondary" : "outline"}
            className="text-xs px-1.5 py-0 h-4"
          >
            {activeCount}
          </Badge>
        </Button>
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <Video className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-base">
        {hasSearch ? "ไม่พบวิดีโอที่ค้นหา" : "ยังไม่มีวิดีโอ"}
      </h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-xs">
        {hasSearch
          ? "ลองใช้คำค้นหาอื่น หรือล้างตัวกรอง"
          : "กดปุ่ม \"เพิ่มวิดีโอ\" ด้านบนเพื่อเริ่มต้น"}
      </p>
    </div>
  );
}

// ─── Stats Cards ─────────────────────────────────────────────────────────────
function StatsCards({ total, active }: { total: number; active: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div className="rounded-xl border bg-card p-4">
        <p className="text-xs text-muted-foreground mb-1">วิดีโอทั้งหมด</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <p className="text-xs text-muted-foreground mb-1">กำลังแสดง</p>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{active}</p>
      </div>
      <div className="rounded-xl border bg-card p-4 hidden sm:block">
        <p className="text-xs text-muted-foreground mb-1">ปิดใช้งาน</p>
        <p className="text-2xl font-bold text-muted-foreground">{total - active}</p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function YoutubePlaylist() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const { data: items = [], isLoading } = useTvPlaylist();
  const deleteMutation = useDeleteTvPlaylist();
  const toggleMutation = useToggleTvPlaylist();

  const allItems = items as PlaylistItem[];
  const activeItems = allItems.filter((i) => i.isActive);

  const filteredItems = allItems
    .filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.youtubeId.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((item) => filter === "all" || item.isActive);

  async function handleDelete(id: string) {
    await deleteMutation.mutateAsync(id);
  }

  async function handleToggle(id: string, isActive: boolean) {
    await toggleMutation.mutateAsync({ id, isActive: !isActive });
  }

  const columns = getColumns({ onDelete: handleDelete, onToggle: handleToggle });

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <Tv className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">TV Playlist</h1>
          </div>
          <p className="text-sm text-muted-foreground pl-10">
            จัดการวิดีโอประชาสัมพันธ์สำหรับ ER TV
          </p>
        </div>

        {/* ✅ ไม่ต้องส่ง open/onOpenChange ลงไปแล้ว — dialog จัดการ state เองใน component */}
        <AddVideoDialog />
      </div>

      {/* Stats */}
      {!isLoading && <StatsCards total={allItems.length} active={activeItems.length} />}

      {/* Search & Filter */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        totalCount={allItems.length}
        activeCount={activeItems.length}
      />

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="text-sm">กำลังโหลด...</span>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState hasSearch={search.length > 0} />
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <TvPlaylistTable columns={columns} data={filteredItems} />
        </div>
      )}
    </div>
  );
}