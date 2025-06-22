import { notFound } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronDown, MoreHorizontal, MessageSquare } from "lucide-react";
import prisma from "@/utils/prisma";
import { PartialBlock } from "@blocknote/core";
import {
  safeJsonParse,
  decompressContent,
  getContentSize,
} from "@/utils/content-optimizer";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import ClientReadOnlyBlockNote from "@/components/workspace/ws-pages/ws-pages-readonly";
import { Metadata } from "next";

export async function generateStaticParams() {
  const pages = await prisma.page.findMany({
    select: { id: true },
  });
  return pages.map((page) => ({ id: page.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id: decodeURIComponent(id) },
    select: { title: true },
  });
  return {
    title: `${page?.title} – Smarnika`,
    description: `Explore ${page?.title} in Smarnika, your AI-powered second brain.`,
  };
}

export default async function DetailedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const page = await prisma.page.findUnique({
    where: { id: decodeURIComponent(id) },
    include: { children: true, comment: true },
  });

  if (!page) return notFound();

  // Optimize content parsing with decompression
  const rawContent = page.content as string;
  const decompressedContent = decompressContent(rawContent);
  const content: PartialBlock[] = safeJsonParse(decompressedContent, []);

  // Log content size for monitoring (server-side)
  if (rawContent) {
    const contentSize = getContentSize(rawContent);
    console.log(`Loading content with size: ${contentSize}`);
  }

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-background w-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ChevronDown className="w-4 h-4 mr-2" />
              {page.title}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Cover & Info */}
        <div className="mb-12">
          {page.cover && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={page.cover as string}
                alt={page.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex items-start gap-4">
            {page.logo && (
              <Avatar className="w-12 h-12 mt-1">
                <AvatarFallback className="text-2xl">
                  {page.logo}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{page.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span>Created {formatDate(new Date(page.createdAt))}</span>
                <span>•</span>
                <span>Last edited {formatDate(new Date(page.updatedAt))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none">
          <div className="min-h-[60vh]">
            {content.length > 0 ? (
              <ClientReadOnlyBlockNote content={content} />
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p>Start typing or press {"/"} for commands</p>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="mt-16 border-t pt-8">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
              <MessageSquare className="w-4 h-4" /> Comments
            </h3>

            {page.comment.length > 0 ? (
              <div className="space-y-4">
                {page.comment.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {comment.content || "Anonymous"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(new Date(comment.createdAt))}
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
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <textarea
                  className="w-full bg-muted/50 rounded-lg p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Add a comment..."
                />
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground"
                  >
                    Cancel
                  </Button>
                  <Button size="sm" className="h-8 px-3">
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
