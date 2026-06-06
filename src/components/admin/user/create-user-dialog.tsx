"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { UserRole } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form, FormField } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { createUser } from "@/app/admin/users/user-actions";

const form = useForm({
  defaultValues: {
    username: "",
    email: "",

    password: "",

    firstName: "",
    lastName: "",

    role: UserRole.STAFF,
  },
});

const [pending, startTransition] = useTransition();

const onSubmit = (values: any) => {
  startTransition(async () => {
    await createUser(values);

    openChange(false);

    form.reset();
  });
};

<Select defaultValue="STAFF">
  <SelectItem value="ADMIN">ADMIN</SelectItem>

  <SelectItem value="DOCTOR">DOCTOR</SelectItem>

  <SelectItem value="NURSE">NURSE</SelectItem>

  <SelectItem value="STAFF">STAFF</SelectItem>
</Select>;
