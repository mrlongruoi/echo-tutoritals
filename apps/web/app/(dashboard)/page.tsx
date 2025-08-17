"use client";

import { useMutation } from 'convex/react';
import { api } from "@workspace/backend/_generated/api";
import { Button } from '@workspace/ui/components/button';
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export default function Page() {
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p>Apps/Web</p>
      <UserButton />
      <OrganizationSwitcher hidePersonal/>
      <Button onClick={() => addUser()}>Add</Button>
    </div>
  )
}
