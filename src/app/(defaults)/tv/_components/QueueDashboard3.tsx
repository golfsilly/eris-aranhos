// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { Clock, Tv, Activity, Users, AlertCircle } from "lucide-react";

// // สมมุติข้อมูล Mock Data สำหรับเชื่อมต่อ Prisma API ในอนาคต
// const inProgressQueues = [
//   {
//     vn: "A023",
//     name: "คุณ สมศักดิ์ รักดี",
//     location: "ช่องตรวจที่ 2",
//     status: "🔬 รอผล Lab",
//     statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
//   },
//   {
//     vn: "A021",
//     name: "คุณ สมศักดิ์ รักดี",
//     location: "ช่องตรวจที่ 2",
//     status: "🔬 รอผล Lab",
//     statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
//   },
//   {
//     vn: "A044",
//     name: "คุณ สมศักดิ์ รักดี",
//     location: "ช่องตรวจที่ 2",
//     status: "🔬 รอผล Lab",
//     statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
//   },
//   {
//     vn: "A055",
//     name: "คุณ สมศักดิ์ รักดี",
//     location: "ช่องตรวจที่ 2",
//     status: "🔬 รอผล Lab",
//     statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
//   },
//   {
//     vn: "A065",
//     name: "คุณ สมศักดิ์ รักดี",
//     location: "ช่องตรวจที่ 2",
//     status: "🔬 รอผล Lab",
//     statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
//   },
//   {
//     vn: "B008",
//     name: "คุณ เจนจิรา มาเยอะ",
//     location: "ห้องเอกซเรย์",
//     status: "🩻 รอผล X-Ray",
//     statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
//   },
//   {
//     vn: "A022",
//     name: "คุณ สมชาย สายลุย",
//     location: "ช่องตรวจที่ 1",
//     status: "🩺 กำลังพบแพทย์",
//     statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
//   },
// ];

// const waitingQueues = [
//   {
//     vn: "A030",
//     name: "คุณ บุญมี มีมาก",
//     level: 1,
//     levelName: "Level 1 วิกฤต",
//     levelColor: "bg-red-600 text-white",
//   },
//   {
//     vn: "A028",
//     name: "คุณ วิภาดา พาเพลิน",
//     level: 2,
//     levelName: "Level 2 ฉุกเฉิน",
//     levelColor: "bg-orange-500 text-slate-950",
//   },
//   {
//     vn: "A031",
//     name: "คุณ มานะ อดทน",
//     level: 3,
//     levelName: "Level 3 เร่งด่วน",
//     levelColor: "bg-yellow-500 text-slate-950",
//   },
//   {
//     vn: "B012",
//     name: "คุณ สมศรี มีทอง",
//     level: 4,
//     levelName: "Level 4 ไม่รุนแรง",
//     levelColor: "bg-green-600 text-white",
//   },
// ];

// export default function QueueDashboard3() {
//   const [time, setTime] = useState("");

//   // อัปเดตเวลาเรียลไทม์ฝั่ง Client
//   useEffect(() => {
//     const updateClock = () => {
//       const now = new Date();
//       setTime(now.toLocaleTimeString("th-TH", { hour12: false }));
//     };
//     updateClock();
//     const interval = setInterval(updateClock, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-50 font-sans">
//       {/* ==================== HEADER ==================== */}
//       <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shadow-md shrink-0">
//         <div className="flex items-center space-x-4">
//           <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-red-900/30">
//             H
//           </div>
//           <div>
//             <h1 className="text-xl font-bold tracking-wide text-slate-100">
//               ระบบคิวอัจฉริยะ ห้องอุบัติเหตุและฉุกเฉิน
//             </h1>
//             <p className="text-xs text-slate-400">
//               โรงพยาบาลอุบัติเหตุและฉุกเฉินระดับสูง
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2 text-right">
//           <Clock className="w-5 h-5 text-emerald-400" />
//           <div>
//             <div className="text-xl font-mono font-bold text-emerald-400 min-w-[80px]">
//               {time || "--:--:--"}
//             </div>
//             <div className="text-[10px] text-slate-400">29 พฤษภาคม 2026</div>
//           </div>
//         </div>
//       </header>

//       {/* ==================== MAIN CONTENT (3 PANELS) ==================== */}
//       <main className="flex flex-1 overflow-hidden p-4 gap-4">
//         {/* PANEL 1: YouTube Video (20%) */}
//         <section className="w-[20%] flex flex-col shrink-0">
//           <Card className="h-full bg-slate-900 border-slate-800 flex flex-col overflow-hidden">
//             <CardHeader className="p-4 pb-2 flex flex-row items-center gap-2 space-y-0">
//               <Tv className="w-4 h-4 text-red-500" />
//               <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider">
//                 ประชาสัมพันธ์
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="flex-1 p-3 pt-0">
//               <div className="w-full h-full bg-black rounded-lg overflow-hidden relative border border-slate-950">
//                 {/* <iframe
//                   className="w-full h-full absolute inset-0"
//                   src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ"
//                   title="ER Educational Video"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 /> */}
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* PANEL 2: อยู่ระหว่างตรวจ (40%) */}
//         <section className="w-[40%] flex flex-col">
//           <Card className="h-full bg-slate-900 border-slate-800 flex flex-col overflow-hidden">
//             <CardHeader className="p-4 pb-3 border-b border-slate-800 flex flex-row items-center justify-between space-y-0">
//               <div className="flex items-center gap-2">
//                 <Activity className="w-5 h-5 text-amber-400" />
//                 <CardTitle className="text-lg font-bold text-amber-400">
//                   อยู่ระหว่างตรวจ / รอผล
//                 </CardTitle>
//               </div>
//               <Badge
//                 variant="outline"
//                 className="bg-amber-500/10 text-amber-400 border-amber-500/20"
//               >
//                 In-Progress
//               </Badge>
//             </CardHeader>
//             <CardContent className="flex-1 p-4 overflow-hidden">
//               <ScrollArea className="h-full pr-2">
//                 <div className="space-y-3">
//                   {inProgressQueues.map((queue) => (
//                     <div
//                       key={queue.vn}
//                       className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors"
//                     >
//                       <div className="flex items-center gap-4">
//                         <span className="font-mono text-2xl font-black text-amber-400 bg-amber-950/20 px-3 py-1 rounded-lg border border-amber-900/30">
//                           {queue.vn}
//                         </span>
//                         <div>
//                           <p className="text-base font-semibold text-slate-200">
//                             {queue.name}
//                           </p>
//                           <p className="text-xs text-slate-400 mt-0.5">
//                             {queue.location}
//                           </p>
//                         </div>
//                       </div>
//                       <Badge
//                         className={`px-3 py-1.5 rounded-full font-medium shadow-sm border ${queue.statusColor}`}
//                       >
//                         {queue.status}
//                       </Badge>
//                     </div>
//                   ))}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </section>

//         {/* PANEL 3: คิวรอเรียกตรวจ (40%) */}
//         <section className="w-[40%] flex flex-col">
//           <Card className="h-full bg-slate-900 border-slate-800 flex flex-col overflow-hidden">
//             <CardHeader className="p-4 pb-3 border-b border-slate-800 flex flex-row items-center justify-between space-y-0">
//               <div className="flex items-center gap-2">
//                 <Users className="w-5 h-5 text-emerald-400" />
//                 <CardTitle className="text-lg font-bold text-emerald-400">
//                   รายชื่อคิวรอเรียกตรวจ
//                 </CardTitle>
//               </div>
//               <Badge
//                 variant="outline"
//                 className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//               >
//                 Waiting List
//               </Badge>
//             </CardHeader>
//             <CardContent className="flex-1 p-4 overflow-hidden">
//               <ScrollArea className="h-full pr-2">
//                 <div className="space-y-3">
//                   {waitingQueues.map((queue) => (
//                     <div
//                       key={queue.vn}
//                       className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
//                         queue.level === 1
//                           ? "bg-red-950/10 border-red-900/40"
//                           : queue.level === 2
//                             ? "bg-orange-950/10 border-orange-900/30"
//                             : "bg-slate-950/60 border-slate-800/80"
//                       }`}
//                     >
//                       <div className="flex items-center gap-4">
//                         <span
//                           className={`font-mono text-2xl font-black px-3 py-1 rounded-lg border ${
//                             queue.level === 1
//                               ? "text-red-400 bg-red-950/50 border-red-900/50"
//                               : queue.level === 2
//                                 ? "text-orange-400 bg-orange-950/40 border-orange-900/30"
//                                 : "text-slate-300 bg-slate-900 border-slate-800"
//                           }`}
//                         >
//                           {queue.vn}
//                         </span>
//                         <p className="text-base font-semibold text-slate-200">
//                           {queue.name}
//                         </p>
//                       </div>
//                       <Badge
//                         className={`px-3 py-1.5 rounded-lg shadow-md font-bold tracking-wider ${queue.levelColor}`}
//                       >
//                         {queue.levelName}
//                       </Badge>
//                     </div>
//                   ))}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </section>
//       </main>

//       {/* ==================== FOOTER (คำวิ่งเลื่อนได้ด้วย Tailwind) ==================== */}
//       <footer className="h-10 bg-slate-950 border-t border-slate-900 flex items-center overflow-hidden shrink-0 relative">
//         <div className="bg-red-600 text-white font-bold px-5 h-full flex items-center text-sm z-10 shadow-xl shrink-0 gap-1.5">
//           <AlertCircle className="w-4 h-4 animate-bounce" />
//           <span>ประกาศ:</span>
//         </div>

//         <div className="flex-1 overflow-hidden relative w-full h-full flex items-center">
//           <div className="animate-marquee whitespace-nowrap text-sm text-slate-300 font-medium absolute flex items-center gap-20">
//             <span>ยินดีต้อนรับสู่ศูนย์บริการห้องฉุกเฉิน</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
