export const ER_DCH_TYPE = {
  DISCHARGE_HOME: 1,
  REFER_TO_OTHER_HOSPITAL: 2,
  ADMITTED: 3,
  DEATH: 4,
  OBSERVATION: 5,
} as const;

export const ER_DCH_TYPES = [
  {
    id: ER_DCH_TYPE.DISCHARGE_HOME,
    name: "กลับบ้าน",
    ovstost: "99",
  },
  {
    id: ER_DCH_TYPE.REFER_TO_OTHER_HOSPITAL,
    name: "ส่งต่อสถานพยาบาลอื่น",
    ovstost: "54",
  },
  {
    id: ER_DCH_TYPE.ADMITTED,
    name: "Admitted",
    ovstost: "2",
  },
  {
    id: ER_DCH_TYPE.DEATH,
    name: "เสียชีวิต",
    ovstost: "4",
  },
  {
    id: ER_DCH_TYPE.OBSERVATION,
    name: "รับไว้สังเกตอาการ",
    ovstost: "1",
  },
] as const;

export type ErDchType =
  (typeof ER_DCH_TYPE)[keyof typeof ER_DCH_TYPE];