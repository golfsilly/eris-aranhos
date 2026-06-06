export const ER_PT_TYPE = {
  EMERGENCY_PATIENT: 1,
  ACCIDENT_PATIENT: 2,
  GENERAL_PATIENT: 3,
  OTHER_SERVICE_PATIENT: 4,
  UCEP: 5,
} as const;

export const ER_PT_TYPES = [
  {
    id: ER_PT_TYPE.EMERGENCY_PATIENT,
    name: "ผู้ป่วยฉุกเฉิน",
  },
  {
    id: ER_PT_TYPE.ACCIDENT_PATIENT,
    name: "ผู้ป่วยอุบัติเหตุ",
  },
  {
    id: ER_PT_TYPE.GENERAL_PATIENT,
    name: "ผู้ป่วยตรวจโรคทั่วไป",
  },
  {
    id: ER_PT_TYPE.OTHER_SERVICE_PATIENT,
    name: "ผู้ป่วยรับบริการอื่น ๆ",
  },
  {
    id: ER_PT_TYPE.UCEP,
    name: "UCEP",
  },
] as const;

export type ErPtType = (typeof ER_PT_TYPE)[keyof typeof ER_PT_TYPE];
