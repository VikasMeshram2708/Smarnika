"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { useTransition, useState } from "react";
import { deleteComment, updateComment } from "@/app/dal/comment-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";

export default function CommentActions({
  commentId,
  initialContent,
}: {
  commentId: string;
  initialContent: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editContent, setEditContent] = useState(initialContent);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteComment(commentId);
        toast.success("Comment deleted");
        setDialogOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Error deleting comment", error);
        toast.error("Error deleting comment");
      }
    });
  };

  const handleEdit = () => {
    startTransition(async () => {
      try {
        const res = await updateComment(commentId, editContent);
        if (res?.success) {
          toast.success("Comment updated");
          setEditOpen(false);
          router.refresh();
        } else {
          toast.error(res?.message || "Failed to update comment");
        }
      } catch (error) {
        console.error("Error updating comment", error);
        toast.error("Error updating comment");
      }
    });
  };

  return (
    <div className="">
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={isPending}
              variant="ghost"
              size="sm"
              className="p-0"
            >
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={isPending}
              onClick={() => setEditOpen(true)}
            >
              Edit
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem disabled={isPending}>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
          </DialogHeader>
          <textarea
            className="w-full bg-muted/50 rounded-lg p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            disabled={isPending}
          />
          <Button
            onClick={handleEdit}
            disabled={isPending || editContent.trim().length === 0}
            size="sm"
            className="h-8 px-3"
            type="button"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
