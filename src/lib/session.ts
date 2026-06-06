import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export type SessionUser = {
  id: string;
  email: string;
  role: string;
  name?: string;
};

export type ServerSession = {
  user: SessionUser;
} | null;

export const getServerSession = cache(async (): Promise<ServerSession> => {
  return auth.api.getSession({
    headers: await headers(),
  }) as Promise<ServerSession>;
});

export async function getServerSession2() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user && !session.user.isActive) {
    return null;
  }

  return session;
}

export async function requireSession(allowedRoles?: readonly string[]) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const role = session?.user?.role;

  if (!role) {
    redirect("/auth/signin");
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    redirect("/403");
  }

  return session;
}

export async function requireAdmin() {
  return requireSession(["ADMIN"]);
}

export async function requireDOCTOR() {
  return requireSession(["ADMIN", "DOCTOR"]);
}

export async function requireNurse() {
  return requireSession(["ADMIN", "DOCTOR", "NURSE"]);
}

export async function requireStaff() {
  return requireSession(["ADMIN", "DOCTOR", "NURSE", "STAFF"]);
}

export async function requireGuest() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return session;
}
