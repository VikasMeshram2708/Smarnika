/**
 * This file contains the functions to verify the user
 */
import "server-only";

import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifyUser = cache(async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      redirect("/");
    }
    return userId;
  } catch (error) {
    console.error("Error verifying user", error);
    throw new Error("You must be signed in to use this feature");
  }
});
