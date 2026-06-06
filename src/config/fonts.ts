import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans_Thai,
  Inter,
  Kanit,
  Noto_Sans_Thai,
  Prompt,
  Sarabun,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai"],
  variable: "--font-kanit",
});

export const ibm_plex_sans_thai = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--font-ibm_plex_sans_thai",
});

export const noto_sans_thai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai"],
  variable: "--font-noto_sans_thai",
});

export const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai"],
  variable: "--font-prompt",
});

export const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai"],
  variable: "--font-sarabun",
});
