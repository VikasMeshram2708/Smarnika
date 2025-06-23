"use client";

import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import { toast } from "sonner";

export default function WsShareBtn({ pageId }: { pageId: string }) {
  function handleCopy() {
    try {
      // generate the copy link
      const copyLink = `${window.location.origin}/workspace/${pageId}`;
      navigator.clipboard.writeText(copyLink);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error("Error copying link", error);
      toast.error("Failed to copy link");
    }
  }
  return (
    <Button variant={"ghost"} onClick={handleCopy} type="button">
      <Forward className="h-4 w-4" />
      <span>Share</span>
    </Button>
  );
}
