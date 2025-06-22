"use client";

import { deletePage } from "@/app/dal/page-action";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function WsDeletePageBtn({ pageId }: { pageId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  console.log("pageId", pageId);
  const handleDelete = async () => {
    startTransition(async () => {
      try {
        if (!pageId) return;
        const res = await deletePage({ pageId: decodeURIComponent(pageId) });
        if (!res.success) {
          toast.error(res.message as string);
          return;
        }
        toast.success(res.message as string);
        router.push("/workspace");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete page");
      }
    });
  };
  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
      className="flex items-center gap-2"
    >
      <Trash className="h-4 w-4" />
      <span>Delete</span>
    </button>
  );
}
