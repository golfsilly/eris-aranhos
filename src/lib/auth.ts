import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins/username";
import { prisma } from "./prisma";
import { UserRole } from "@prisma/client"; 

export const auth = betterAuth({
  // ── Database ──────────────────────────────────────────────────────────────
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),

  // ── Email & Password ──────────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 3,
    maxPasswordLength: 128,
    autoSignIn: true,
  },

  // ── Session ───────────────────────────────────────────────────────────────
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh when 1 day remaining
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache for 5 minutes
    },
  },

  // ── Account ───────────────────────────────────────────────────────────────
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["email-password"],
    },
  },

  // ── Advanced ──────────────────────────────────────────────────────────────
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookiePrefix: "ba",
    generateId: false,
    userAgent: true,
  },

  experimental: {
    joins: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "STAFF",
        input: false,
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
        input: false,
      },
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: user.role === "user" ? UserRole.STAFF : user.role,
            },
          };
        },
      },
    },
  },

  // ── Plugins ───────────────────────────────────────────────────────────────
  plugins: [username(), nextCookies()],
});
