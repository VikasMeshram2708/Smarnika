/**
 * This file contains the actions for the page collection
 */
"use server";

import {
  deletePageSchema,
  DeletePageSchema,
  pageSchema,
  PageSchema,
} from "@/models/page-model";
import prisma from "@/utils/prisma";
import { verifyUser } from "@/utils/verify-user";
import { revalidatePath } from "next/cache";
import assert from "node:assert";
import z from "zod/v4";

// Create new Page
export async function addPage(incData: PageSchema & { id?: string }) {
  try {
    // auth check
    const userId = await verifyUser();
    assert(userId, "Unauthorized");
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

    // save to db using upsert
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

// Delete page
export async function deletePage(incData: DeletePageSchema) {
  try {
    // auth check
    const userId = await verifyUser();
    assert(userId, "Unauthorized");
    // sanitize
    const parsed = deletePageSchema.safeParse(incData);
    if (!parsed.success) {
      return {
        success: false,
        message: z.flattenError(parsed.error).fieldErrors.pageId,
      };
    }
    const { pageId } = parsed.data;

    // delete page
    await prisma.page.delete({
      where: { id: pageId, userId },
    });

    // revalidate
    revalidatePath("/workspace");
    return {
      success: true,
      message: "Page Deleted",
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
