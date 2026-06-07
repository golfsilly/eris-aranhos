"use client";

import * as React from "react";
import { Loader2, Volume2, VolumeX } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useUpdateYoutubeSetting, useYoutubeSetting } from "../hooks/use-youtube-setting";

export function YoutubeSettingCard() {
  const { data, isLoading } = useYoutubeSetting();
  const updateMutation = useUpdateYoutubeSetting();

  // ใช้เฉพาะตอนกำลังลาก Slider
  const [localVolume, setLocalVolume] = React.useState<number | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="size-5 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const volumePercent =
    localVolume !== null
      ? localVolume
      : Math.round(data.volume * 100);

  return (
    <Card className="max-w-6xl mx-auto">
      <CardContent className="space-y-6 pt-6">
        {/* Header */}
        <div>
          <h3 className="font-semibold">
            Youtube Player Settings
          </h3>

          <p className="text-sm text-muted-foreground">
            ตั้งค่าเสียงสำหรับวิดีโอทั้งหมด
          </p>
        </div>

        {/* Mute */}
        <div className="flex items-center justify-between">
          <Label htmlFor="youtube-muted">
            เปิดเสียง
          </Label>

          <Switch
            id="youtube-muted"
            checked={!data.muted}
            disabled={updateMutation.isPending}
            onCheckedChange={(checked) => {
              updateMutation.mutate({
                muted: !checked,
                volume: data.volume,
              });
            }}
          />
        </div>

        {/* Volume */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {data.muted ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}

            <span className="text-sm font-medium">
              {volumePercent}%
            </span>
          </div>

          <Slider
            value={[volumePercent]}
            min={0}
            max={100}
            step={1}
            disabled={data.muted || updateMutation.isPending}
            onValueChange={(value) => {
              setLocalVolume(value[0] ?? 0);
            }}
            onValueCommit={(value) => {
              const nextVolume = value[0] ?? 0;

              updateMutation.mutate({
                muted: data.muted,
                volume: nextVolume / 100,
              });

              // กลับไปใช้ค่าจาก React Query
              setLocalVolume(null);
            }}
          />
        </div>

        {/* Saving */}
        {updateMutation.isPending && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3 animate-spin" />
            กำลังบันทึก...
          </div>
        )}
      </CardContent>
    </Card>
  );
}