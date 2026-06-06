"use client";

import UserTable from "@/components/admin/user/user-table";
import UserToolbar, {
  UserRoleFilter,
} from "@/components/admin/user/user-toolbar";
import { UserRow } from "@/types/user";

interface Props {
  users: UserRow[];

  pagination: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };

  filters: {
    search: string;
    role: UserRoleFilter;
  };
}

export default function UserManagementClient({
  users,
  pagination,
  filters,
}: Props) {
  return (
    <div className="space-y-6">
      <UserToolbar search={filters.search} role={filters.role} />

      <UserTable data={users} pagination={pagination} />
    </div>
  );
}
