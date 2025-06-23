import "server-only";
import prisma from "./prisma";
import { cache } from "react";

export const fetchComments = cache(async (pageId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { pageId },
    });
    return comments ?? [];
  } catch (error) {
    console.error("Error fetching comments", error);
    return [];
  }
});
