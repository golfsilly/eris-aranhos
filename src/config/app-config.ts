import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  app: {
    name: {
      th: "ระบบห้องอุบัติเหตุและฉุกเฉิน",
      en: "Emergency Room Information System",
    },
    version: packageJson.version,
  },
  hospital: {
    name: {
      th: "โรงพยาบาลอรัญประเทศ",
      en: "Aranyaprathet Hospital",
    },
    shortName: "ARH",
    website: "https://aranhos.moph.go.th",
    email: "sarabankang.aran@gmail.com",
    facebook: "https://www.facebook.com/aran.hosp",
  },
  seo: {
    title: "ระบบห้องอุบัติเหตุและฉุกเฉิน โรงพยาบาลอรัญประเทศ",
    description: "ระบบห้องอุบัติเหตุและฉุกเฉิน โรงพยาบาลอรัญประเทศ",
    keywords: [
      "ER",
      "Emergency Room",
      "Hospital",
      "Aranyaprathet",
      "โรงพยาบาลอรัญประเทศ",
    ] satisfies string[],
    image: "/images/logo-aranhos.png",
  },
  copyright: `© ${currentYear}, Aranyaprathet Hospital.`,
} as const;
