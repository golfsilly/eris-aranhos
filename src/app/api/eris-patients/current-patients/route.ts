import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { queryHos } from "@/lib/hosdb";

export interface CurrentPatientRow extends RowDataPacket {
  vn: string;
  hn: string;
  oqueue: number;

  vstdate: string;
  vsttime: string;
  cur_dep_time: string;
  ttime: string;

  fullname: string;

  observe: string | null;

  confirm_all: string | null;

  lab_count: number | null;
  report_count: number | null;

  age_y: number;

  er_pt_type: number | null;

  pt_priority_id: number | null;
  er_emergency_level_id: number | null;
  er_dch_type_id: number | null;

  cur_dep: string;
  last_dep: string;

  ovstost: string | null;
  tost_name: string | null;
}

export const CURRENT_PATIENTS_SQL = `
SELECT
    ovst.vn,
    ovst.hn,
    ovst.oqueue,

    ovst.vstdate,
    ovst.vsttime,
    ovst.cur_dep_time,

    SUBSTR(
        TIMEDIFF(CURTIME(), ovst.cur_dep_time),
        1,
        5
    ) AS ttime,

    CONCAT(
        patient.pname,
        patient.fname,
        ' ',
        patient.lname
    ) AS fullname,

    er_regist.observe,

    xray_head.confirm_all,

    lab_status.lab_count,
    lab_status.report_count,

    vn_stat.age_y,

    er_regist.er_pt_type,

    ovst.pt_priority AS pt_priority_id,

    er_regist.er_emergency_level_id,

    er_regist.er_dch_type AS er_dch_type_id,

    ovst.cur_dep,
    ovst.last_dep,

    ovstost.ovstost,
    ovstost.NAME AS tost_name

FROM ovst

LEFT JOIN patient
    ON patient.hn = ovst.hn

LEFT JOIN vn_stat
    ON vn_stat.vn = ovst.vn

LEFT JOIN er_regist
    ON er_regist.vn = ovst.vn

LEFT JOIN lab_status
    ON lab_status.vn = ovst.vn

LEFT JOIN xray_head
    ON xray_head.vn = ovst.vn

LEFT JOIN ovstost
    ON ovstost.ovstost = ovst.ovstost

WHERE
    (
        er_regist.vstdate = CURDATE()
        OR er_regist.vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    )
    AND (
        er_regist.er_dch_type IS NULL
        OR er_regist.er_dch_type = ''
        OR er_regist.er_dch_type = '5'
    )
    AND er_regist.er_emergency_level_id IS NOT NULL

ORDER BY
   	er_regist.er_emergency_level_id ASC,
	ovst.vsttime ASC
`;

export async function GET() {
  try {
    const patients = await queryHos<CurrentPatientRow[]>(CURRENT_PATIENTS_SQL);

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Current Patients API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch current patients",
      },
      {
        status: 500,
      },
    );
  }
}
