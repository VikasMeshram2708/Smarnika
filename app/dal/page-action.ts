/**
 * This file contains the actions for the page collection
 */
"use server";

import { pageSchema, PageSchema } from "@/models/page-model";
import prisma from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import assert from "node:assert";
import z from "zod/v4";

export async function addPage(incData: PageSchema) {
  try {
    // auth check
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    // sanitize
    const parsed = pageSchema.safeParse(incData);
    if (!parsed.success) {
      return {
        success: false,
        message: z.flattenError(parsed.error).fieldErrors,
      };
    }
    const { title, content, cover, logo } = parsed.data;

    assert(userId, "Unauthorized");

    // save to db
    await prisma.page.create({
      data: {
        title,
        content,
        cover,
        logo,
        userId,
      },
    });

    // revalidate
    revalidatePath("/workspace");
    return {
      success: true,
      message: "Page Created",
    };
  } catch (error) {
    const err = (error as Error).message ?? "Something went wrong";
    return {
      success: false,
      message: err,
      stack:
        process.env.NODE_ENV === "development"
          ? (error as Error).stack
          : "no stack trace found",
    };
  }
}
