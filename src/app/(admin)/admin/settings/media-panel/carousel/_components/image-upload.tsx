"use client";

import * as React from "react";
import { ImagePlus } from "lucide-react";

type Props = {
  onChange: (file: File | null) => void;
};

export function ImageUpload({ onChange }: Props) {
  const [preview, setPreview] =
    React.useState<string | null>(null);

  function handleFile(file: File | null) {
    onChange(file);

    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div className="space-y-3">
      <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 hover:bg-muted">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            handleFile(
              e.target.files?.[0] || null
            )
          }
        />

        <ImagePlus className="h-6 w-6 text-muted-foreground" />

        <p className="mt-2 text-sm text-muted-foreground">
          Click to upload image
        </p>
      </label>

      {preview && (
        <img
          src={preview}
          className="h-48 w-full rounded-lg object-cover border"
        />
      )}
    </div>
  );
}