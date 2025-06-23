import { notFound } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
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
import Comment from "@/components/comments/comment";
import { Suspense } from "react";
import WsShareBtn from "@/components/workspace/ws-sidebar/ws-share-btn";
import prisma from "@/utils/prisma";

export async function generateStaticParams() {
  const pages = await prisma.page.findMany({
    select: {
      id: true,
    },
  });

  return pages.map((page) => ({ id: page.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // use prisma
  const page = await prisma.page.findUnique({
    where: { id },
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
    where: { id },
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
          <WsShareBtn pageId={page.id ?? ""} />
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
          <Suspense fallback={<p>Loading comments...</p>}>
            <Comment pageId={page.id ?? ""} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
