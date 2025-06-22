import "server-only";

/**
 * This file contains the functions to verify the user
 */

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifyUser = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return userId;
});
