import * as z from "zod/v4";

// page schema
export const pageSchema = z.object({
  title: z.string().min(1),
  cover: z.url().optional(),
  logo: z.string().optional(),
  content: z.string().min(1).optional(),
});

export type PageSchema = z.infer<typeof pageSchema>;

// comment schema
export const commentSchema = z.object({
  content: z.string().min(1),
});

export type CommentSchema = z.infer<typeof commentSchema>;
