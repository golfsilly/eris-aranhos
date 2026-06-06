export const ERMERGENCY_LEVEL = {
  Resuscitate: 1,
  Emergency: 2,
  Urgency: 3,
  Semi_Urgency: 4,
  Non_Urgency: 5,
} as const;

export const ERMERGENCY_LEVELS = [
  { id: 1, name: "Resuscitate (กู้ชีพทันที)" },
  { id: 2, name: "Emergency (ฉุกเฉิน)" },
  { id: 3, name: "Urgent (ด่วนมาก)" },
  { id: 4, name: "Semi Urgent (ด่วน)" },
  { id: 5, name: "Non Urgent (รอได้)" },
];