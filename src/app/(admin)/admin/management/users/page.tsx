import { UserRole } from "@prisma/client";

import { getUsers } from "./actions";
import { userSearchSchema } from "./schema";

import UserManagementClient from "./_components/user-management-client";

import { UserStats } from "@/components/admin/user/user-stats";
import type { UserRoleFilter } from "@/components/admin/user/user-toolbar";

interface Props {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    role?: UserRole;
  }>;
}

export default async function UsersPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  const parsed =
    userSearchSchema.parse(params);

  const result = await getUsers({
    page: parsed.page,
    pageSize: parsed.pageSize,

    ...(parsed.search && {
      search: parsed.search,
    }),

    ...(parsed.role && {
      role: parsed.role,
    }),
  });

  return (
    <div className="space-y-3">
      <UserStats />

      <UserManagementClient
        users={result.data}
        pagination={
          result.pagination
        }
        filters={{
          search:
            parsed.search ?? "",
          role:
            (parsed.role ??
              "ALL") as UserRoleFilter,
        }}
      />
    </div>
  );
}