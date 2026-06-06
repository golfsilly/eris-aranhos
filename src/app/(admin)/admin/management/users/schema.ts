import { z } from "zod";
import { UserRole } from "@prisma/client";

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),

  password: z.string().min(3),

  firstName: z.string().min(1),
  lastName: z.string().min(1),

  role: z.nativeEnum(UserRole),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  id: z.string(),

  username: z.string().min(3),

  email: z.email(),

  firstName: z.string().min(1),
  lastName: z.string().min(1),

  role: z.nativeEnum(UserRole),

  isActive: z.boolean(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const userSearchSchema = z.object({
  page: z.coerce.number().default(1),

  pageSize: z.coerce.number().default(10),

  search: z.string().optional(),

  role: z.nativeEnum(UserRole).optional(),
});
