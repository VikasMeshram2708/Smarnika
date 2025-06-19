import { notFound } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ChevronDown,
  MoreHorizontal,
  Text,
  Heading1,
  Heading2,
  Bold,
  Italic,
  Link,
  Image as ImageIcon,
  SeparatorHorizontal,
  Undo,
  Redo,
  MessageSquare,
} from "lucide-react";
import prisma from "@/utils/prisma";

type DetailedPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DetailedPage({ params }: DetailedPageProps) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id: decodeURIComponent(id) },
    include: { children: true, comment: true },
  });

  if (!page) return notFound();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Notion-like Header */}
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

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-12">
          {page.cover && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={page.cover}
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

        {/* Content Editor Area */}
        <div className="prose dark:prose-invert max-w-none">
          {/* Floating Format Toolbar (appears when selecting text) */}
          <div className="sticky top-14 z-20 mb-4 bg-background/90 backdrop-blur-sm border rounded-lg shadow-sm p-1 flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Text className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Italic className="w-4 h-4" />
            </Button>
            <SeparatorHorizontal orientation="vertical" className="h-5 mx-1" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Link className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ImageIcon className="w-4 h-4" />
            </Button>
            <SeparatorHorizontal orientation="vertical" className="h-5 mx-1" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          {/* Page Content */}
          <div className="min-h-[60vh]">
            {page.content ? (
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p>Start typing or press {"/"} for commands</p>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="mt-16 border-t pt-8">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
              <MessageSquare className="w-4 h-4" />
              Comments
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
      </main>

      {/* Side Panel (Toggleable) */}
      {/* <aside className="fixed right-0 top-0 h-full w-64 border-l bg-background/90 backdrop-blur-sm p-4 hidden lg:block">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2">
              Last edited
            </h3>
            <p className="text-sm">{formatDate(new Date(page.updatedAt))}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2">
              Created
            </h3>
            <p className="text-sm">{formatDate(new Date(page.createdAt))}</p>
          </div>

          {page.children?.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground mb-2">
                Sub-pages
              </h3>
              <div className="space-y-1">
                {page.children?.map((child) => (
                  <Button
                    key={child.id}
                    variant="ghost"
                    className="w-full justify-start h-8 px-2 text-sm font-normal"
                  >
                    {child.title}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2">
              Actions
            </h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm"
              >
                Export as PDF
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm"
              >
                Add to favorites
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </aside> */}
    </div>
  );
}
