export const OVSTOST = {
  WAIT_RESULT: "00",
  ADMIT_MEDICINE: "01",
  ADMIT_SURGERY: "02",
  ADMIT_OB_GYN: "03",
  ADMIT_PEDIATRIC: "05",
  ADMIT_ORTHOPEDIC: "08",
  ADMIT_ICU: "09",
  ADMIT_DENTAL: "11",
  ADMIT_ACCIDENT: "13",
  ADMIT_OBSERVATION: "14",
  FOLLOW_UP_48H: "48",
  REFER_OTHER_HOSPITAL: "54",
  HEALTH_PROMOTION: "61",
  TREATMENT_CLINIC: "62",
  TREATMENT_ER: "63",
  ADMIT: "888",
  WAIT_MEDICINE: "98",
  COMPLETED: "99",
  DISCHARGE_HOME: "999",
} as const;

export const OVSTOSTS = [
  {
    id: OVSTOST.WAIT_RESULT,
    name: "รอผลตรวจ",
  },

  {
    id: OVSTOST.ADMIT_MEDICINE,
    name: "Admit แผนกอายุรกรรม",
  },
  {
    id: OVSTOST.ADMIT_SURGERY,
    name: "Admit แผนกศัลยกรรม",
  },
  {
    id: OVSTOST.ADMIT_OB_GYN,
    name: "Admit แผนกสูติกรรม",
  },
  {
    id: OVSTOST.ADMIT_PEDIATRIC,
    name: "Admit แผนกกุมารเวชกรรม",
  },
  {
    id: OVSTOST.ADMIT_ORTHOPEDIC,
    name: "Admit แผนกศัลยกรรมกระดูก",
  },
  {
    id: OVSTOST.ADMIT_ICU,
    name: "Admit แผนกวิกฤติ",
  },
  {
    id: OVSTOST.ADMIT_DENTAL,
    name: "Admit แผนกทันตกรรม",
  },
  {
    id: OVSTOST.ADMIT_ACCIDENT,
    name: "Admit แผนกอุบัติเหตุ",
  },
  {
    id: OVSTOST.ADMIT_OBSERVATION,
    name: "Admit สังเกตอาการ",
  },

  {
    id: OVSTOST.FOLLOW_UP_48H,
    name: "ติดตามอาการ 48 ชั่วโมง",
  },
  {
    id: OVSTOST.REFER_OTHER_HOSPITAL,
    name: "ส่งต่อสถานพยาบาลอื่น",
  },

  {
    id: OVSTOST.HEALTH_PROMOTION,
    name: "ตรวจรักษาที่แผนกส่งเสริมสุขภาพ",
  },
  {
    id: OVSTOST.TREATMENT_CLINIC,
    name: "ตรวจรักษาที่แผนก",
  },
  {
    id: OVSTOST.TREATMENT_ER,
    name: "ตรวจรักษาที่ห้อง ER",
  },

  {
    id: OVSTOST.ADMIT,
    name: "Admit",
  },

  {
    id: OVSTOST.WAIT_MEDICINE,
    name: "รอรับยา",
  },
  {
    id: OVSTOST.COMPLETED,
    name: "ตรวจแล้ว",
  },
  {
    id: OVSTOST.DISCHARGE_HOME,
    name: "กลับบ้าน",
  },
] as const;

export type Ovstost = (typeof OVSTOST)[keyof typeof OVSTOST];
