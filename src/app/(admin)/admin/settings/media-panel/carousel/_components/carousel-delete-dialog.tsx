"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { deleteCarouselImage } from "../actions/delete-carousel-image";

type Props = {
  id: string;
};

export function CarouselDeleteDialog({
  id,
}: Props) {
  const [open, setOpen] =
    React.useState(false);

  async function handleDelete() {
    try {
      await deleteCarouselImage(id);

      toast.success("Deleted");

      setOpen(false);
    } catch {
      toast.error("Delete failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Image?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            การลบนี้จะลบทั้งจาก Cloudinary
            และ Database
          </p>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}