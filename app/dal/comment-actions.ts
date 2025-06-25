"use server";

import { commentSchema, CommentSchema } from "@/models/comment-model";
import prisma from "@/utils/prisma";
import { verifyUser } from "@/utils/verify-user";
import { revalidatePath } from "next/cache";
import assert from "node:assert";
import z from "zod/v4";

// Create a comment
export async function createComment(incData: CommentSchema) {
  try {
    const userId = await verifyUser();
    // sanitize
    const parsed = commentSchema.safeParse(incData);
    if (!parsed.success) {
      return {
        success: false,
        message: z.flattenError(parsed.error).fieldErrors.content,
      };
    }

    const { content, pageId } = parsed.data;
    assert(userId, "Unauthorized");
    await prisma.comment.create({
      data: {
        content,
        pageId,
      },
    });

    // revalidate
    revalidatePath(`/workspace/${pageId}`);
    return {
      success: true,
      message: "Commented successfully",
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

// Delete a comment
export async function deleteComment(commentId: string) {
  try {
    const userId = await verifyUser();
    assert(userId, "Unauthorized");
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    revalidatePath(`/workspace/:path`);
    return {
      success: true,
      message: "Comment deleted successfully",
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

// Update a comment
export async function updateComment(commentId: string, content: string) {
  try {
    const userId = await verifyUser();
    assert(userId, "Unauthorized");
    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
    revalidatePath(`/workspace/${updated.pageId}`);
    return {
      success: true,
      message: "Comment updated successfully",
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
