"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentSchema } from "@/models/comment-model";
import { Form, FormField, FormItem } from "../ui/form";
import { toast } from "sonner";
import { createComment } from "@/app/dal/comment-actions";
import { useTransition } from "react";

export default function CommentForm({ pageId }: { pageId: string }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      pageId,
      content: "",
    },
  });

  async function handleSave(data: CommentSchema) {
    startTransition(async () => {
      try {
        const res = await createComment(data);
        if (!res.success) {
          toast.error(res.message ?? "Error saving comment");
          return;
        }
        toast.success("Comment saved");
        form.reset();
      } catch (error) {
        console.error("Error saving comment", error);
        toast.error("Error saving comment");
      }
    });
  }
  return (
    <Form {...form}>
      <form
        className="space-y-4 flex-1 relative"
        onSubmit={form.handleSubmit(handleSave)}
      >
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <textarea
                className="w-full bg-muted/50 rounded-lg p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Add a comment..."
                {...field}
              />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          size="sm"
          className="h-8 px-3"
          type="submit"
        >
          {isPending ? "Saving..." : "Comment"}
        </Button>
      </form>
    </Form>
  );
}
