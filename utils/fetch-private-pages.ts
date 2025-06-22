import { cache } from "react";
import prisma from "./prisma";
import { verifyUser } from "./verify-user";
import { Page } from "@/lib/generated/prisma";

// Type for minimal page data needed in sidebar
export type MinimalPage = Pick<Page, "id" | "title" | "logo">;

export const fetchPrivatePages = cache(async (): Promise<Page[]> => {
  try {
    const userId = await verifyUser();

    if (!userId) {
      return [];
    }

    const privatePages = await prisma.page.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc", // Changed to updatedAt for better UX
      },
      take: 10,
      // Return all fields to maintain compatibility with Page type
    });

    return privatePages ?? [];
  } catch (error) {
    console.error("Error fetching private pages:", error);
    return [];
  }
});

// Optimized version that only fetches required fields
export const fetchMinimalPrivatePages = cache(
  async (): Promise<MinimalPage[]> => {
    try {
      const userId = await verifyUser();

      if (!userId) {
        return [];
      }

      const privatePages = await prisma.page.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 10,
        select: {
          id: true,
          title: true,
          logo: true,
        },
      });

      return privatePages ?? [];
    } catch (error) {
      console.error("Error fetching minimal private pages:", error);
      return [];
    }
  }
);
