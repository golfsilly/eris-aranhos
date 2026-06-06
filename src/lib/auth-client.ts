"use client";

import { createAuthClient } from "better-auth/react";
import {
  usernameClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3200",
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  updateUser,
  changePassword,
  deleteUser,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
} = authClient;
