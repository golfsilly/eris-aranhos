import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900">
      <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5">
        <div className="flex items-center justify-center rounded-full bg-amber-100 p-5 mb-6">
          <AlertTriangle className="h-12 w-12 text-amber-600" />
        </div>
        <h1 className="text-6xl font-black text-amber-700">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">ไม่พบหน้าที่คุณกำลังค้นหา</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          หน้านี้อาจถูกลบ ย้ายไปแล้ว หรือคุณพิมพ์ URL ผิดพลาด
          กรุณาตรวจสอบอีกครั้งหรือกลับไปยังหน้าหลัก
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">กลับหน้าหลัก</Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/auth/signin">เข้าสู่ระบบ</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
