"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { useTransition, useState } from "react";
import { deleteComment } from "@/app/dal/comment-actions";
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

export default function DeleteComment({ commentId }: { commentId: string }) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteComment(commentId);
        toast.success("Comment deleted");
        setDialogOpen(false);
      } catch (error) {
        console.error("Error deleting comment", error);
        toast.error("Error deleting comment");
      }
    });
  };

  return (
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
          <DropdownMenuItem disabled={isPending}>Edit</DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem disabled={isPending}>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
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
  );
}
