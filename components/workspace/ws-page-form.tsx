"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { addPage } from "@/app/dal/page-action";
import { toast } from "sonner";

export default function WsPageForm() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await addPage({
          title: title ?? `Title - ${new Date(Date.now())}`,
          content,
          cover: "https://picsum.photos/seed/picsum/200/300",
          logo: "🤖",
        });
        if (!res.success) {
          toast.error("Error", {
            description: res.message as string,
          });
          return;
        }
        toast.success("Page created successfully");
        setContent("");
      } catch (error) {
        const err = (error as Error).message ?? "Something went wrong";
        throw toast.error(err);
      }
    });
  }
  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            placeholder="Enter a title for your page"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Input
            placeholder="Enter a content for your page"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
