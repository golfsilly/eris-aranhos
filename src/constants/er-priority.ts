export const PT_PRIORITY = {
  NORMAL: 0,
  RESUSCITATION: 1,
  EMERGENCY: 2,
  URGENT: 3,
  SEMI_URGENT: 4,
  NON_URGENT: 5,
} as const;

export const PT_PRIORITYS = [
  { id: 0, name: "ปกติ" },
  { id: 1, name: "Resucitation" },
  { id: 2, name: "Emergency" },
  { id: 3, name: "Ergent" },
  { id: 4, name: "Semi-Ergent" },
  { id: 5, name: "non-Ergent" },
];