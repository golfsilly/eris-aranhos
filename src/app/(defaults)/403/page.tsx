import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <ShieldAlert className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-red-600">403</h1>

        <h2 className="mt-4 text-2xl font-bold">ไม่มีสิทธิ์เข้าถึงหน้านี้</h2>

        <p className="mt-3 text-muted-foreground">
          บัญชีผู้ใช้งานของคุณไม่มีสิทธิ์ในการเข้าถึง หน้าที่ร้องขอ
          กรุณาติดต่อผู้ดูแลระบบ
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/dashboard">กลับหน้า Dashboard</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/auth/signin">เข้าสู่ระบบใหม่</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
