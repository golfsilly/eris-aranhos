"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { createCarouselImage } from "../actions/create-carousel-image";

import { ImageUpload } from "./image-upload";

import {
  carouselSchema,
  CarouselSchema,
} from "../carousel.schema";

export function CarouselFormDialog() {
  const [file, setFile] =
    React.useState<File | null>(null);

  // ✅ FIX: RHF + Zod fully aligned
  const form = useForm<CarouselSchema>({
    resolver: zodResolver(carouselSchema),

    defaultValues: {
      title: "",
      durationSec: 10,
      isActive: true,
    },
  });

  // ✅ FIX: explicit SubmitHandler type
  const onSubmit: SubmitHandler<CarouselSchema> =
    async (values) => {
      try {
        if (!file) {
          toast.error("กรุณาเลือกรูป");
          return;
        }

        const formData = new FormData();

        formData.append("image", file);
        formData.append(
          "title",
          values.title || ""
        );
        formData.append(
          "durationSec",
          String(values.durationSec)
        );
        formData.append(
          "isActive",
          String(values.isActive)
        );

        await createCarouselImage(formData);

        toast.success("Created successfully");

        // ✅ better than reload (optional but ok)
        window.location.reload();
      } catch (err) {
        console.error(err);
        toast.error("Upload failed");
      }
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          เพิ่มรูป Carousel
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Upload Carousel Image
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* IMAGE UPLOAD */}
          <ImageUpload onChange={setFile} />

          {/* TITLE */}
          <Input
            placeholder="Title"
            {...form.register("title")}
          />

          {/* DURATION */}
          <Input
            type="number"
            placeholder="Duration (sec)"
            {...form.register(
              "durationSec",
              {
                valueAsNumber: true,
              }
            )}
          />

          {/* SWITCH */}
          <div className="flex items-center justify-between">
            <span className="text-sm">
              Active
            </span>

            <Switch
              checked={form.watch("isActive")}
              onCheckedChange={(v) =>
                form.setValue("isActive", v)
              }
            />
          </div>

          {/* SUBMIT */}
          <Button
            className="w-full"
            onClick={form.handleSubmit(
              onSubmit
            )}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}