import { MessageSquare } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { type Comment } from "@/lib/generated/prisma";
import { fetchComments } from "@/utils/fetch-comments";
import { currentUser } from "@clerk/nextjs/server";
import CommentForm from "./comment-form";
import DeleteComment from "./delete-comment";

export default async function Comment({ pageId }: { pageId: string }) {
  const comments = await fetchComments(pageId);
  const user = await currentUser();

  const formatDate = (date: Date) =>
    date.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  return (
    <div className="mt-16 border-t pt-8">
      <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
        <MessageSquare className="w-4 h-4" /> Comments
      </h3>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(new Date(comment.createdAt))}
                  </span>
                  <span className="text-sm font-medium">
                    <DeleteComment commentId={comment.id} />
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet</p>
      )}

      <div className="mt-6 flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
        {/* form */}
        <CommentForm pageId={pageId} />
      </div>
    </div>
  );
}
