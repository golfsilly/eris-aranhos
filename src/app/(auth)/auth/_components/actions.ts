"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SignUpFormValues, SignUpSchema } from "./schema";

export async function signUpUser(values: SignUpFormValues) {
  const parsed = SignUpSchema.parse(values);

  return await auth.api.signUpEmail({
    body: {
      email: parsed.email,
      password: parsed.password,
      username: parsed.username,
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      name: `${parsed.firstName} ${parsed.lastName}`,
      displayUsername: `${parsed.firstName} ${parsed.lastName}`,
    },
    headers: await headers(),
  });
}
