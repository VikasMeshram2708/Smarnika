/**
 * This file contains the DAL for the search actions.
 */
"use server";

import prisma from "@/utils/prisma";
import { verifyUser } from "@/utils/verify-user";

export const searchPages = async (searchText: string) => {
  try {
    const userId = await verifyUser();

    if (!searchText.trim()) return;

    const pages = await prisma.page.findMany({
      where: {
        title: { contains: searchText, mode: "insensitive" },
        userId: userId,
      },
    });
    // console.log("pages", pages);

    return {
      success: true,
      message: "Pages fetched successfully",
      pages,
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
};
