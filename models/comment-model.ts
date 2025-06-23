import * as z from "zod/v4";

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Comment is required" })
    .max(250, "Comment must be less than 250 characters"),
  pageId: z.uuid({ message: "Page is required" }),
});

export type CommentSchema = z.infer<typeof commentSchema>;

export const deleteCommentSchema = z.object({
  commentId: z.uuid(),
});
export type DeleteCommentSchema = z.infer<typeof deleteCommentSchema>;
