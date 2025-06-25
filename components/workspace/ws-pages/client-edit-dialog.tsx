"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WsEditor from "@/components/workspace/ws-editor";
import { updatePage } from "@/app/dal/page-action";
import { Button } from "@/components/ui/button";

export default function ClientEditDialog({
  pageId,
  initialTitle,
  initialContent,
}: {
  pageId: string;
  initialTitle: string;
  initialContent: any;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSave({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    const res = await updatePage(pageId, { title, content });
    if (res?.success) {
      toast.success("Page updated");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(
        typeof res?.message === "string" ? res.message : "Failed to update page"
      );
    }
    return res;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Page</DialogTitle>
        </DialogHeader>
        <WsEditor
          handleOpenChange={setOpen}
          initialTitle={initialTitle}
          initialContent={initialContent}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}
