import { Suspense } from "react";
import { TextInitial } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getFooterMessages } from "./footer-message.actions";
import { FooterMessagesTable } from "./_components/footer-message-table";

export const metadata = {
  title: "จัดการ Footer Message",
};

async function FooterMessagesContent() {
  const data = await getFooterMessages();
  return <FooterMessagesTable initialData={data} />;
}

function TableSkeleton() {
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
      <div className="p-4 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function FooterMessagesPage() {
  return (
    <div className="container max-w-7xl py-2 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <TextInitial className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">จัดการ Footer Message</h1>
          <p className="text-sm text-muted-foreground">
            เพิ่ม แก้ไข และจัดเรียงข้อความ footer
          </p>
        </div>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <FooterMessagesContent />
      </Suspense>
    </div>
  );
}