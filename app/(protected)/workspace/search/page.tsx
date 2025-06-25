"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/utils/use-debounce";
import { Page } from "@/lib/generated/prisma";
import { searchPages } from "@/app/dal/search-actions";
import Link from "next/link";
import { Search, Loader2, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const debouncedText = useDebounce(searchText, 500);
  const [data, setData] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedText.trim()) {
        setData([]);
        return;
      }

      setLoading(true);
      try {
        const res = await searchPages(debouncedText);
        setData(res?.success ? res.pages ?? [] : []);
      } catch (error) {
        console.error("Search error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedText]);

  return (
    <div className="bg-background min-h-screen px-4 py-6 md:px-10 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Smarnika</h1>
          <p className="text-muted-foreground text-sm">
            Instantly find notes, documents, and pages.
          </p>
        </div>

        {/* Search Input */}
        <Card className="p-3 md:p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              className="w-full pl-10 py-5 text-base focus-visible:ring-0 border-none shadow-none"
              placeholder="Search pages, notes, or titles..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
            )}
          </div>
        </Card>

        {/* Result Area */}
        <div className="mt-8 space-y-4">
          {loading && debouncedText ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-full h-16 rounded-lg" />
              ))}
            </div>
          ) : data.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground">
                {data.length} result{data.length > 1 ? "s" : ""} found
              </p>
              <div className="space-y-3">
                {data.map((page) => (
                  <Link key={page.id} href={`/workspace/${page.id}`}>
                    <Card className="p-4 group cursor-pointer hover:bg-accent transition-colors">
                      <div className="flex gap-4 items-start">
                        <FileText className="h-5 w-5 mt-1 text-muted-foreground" />
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base font-semibold text-primary group-hover:underline">
                            {page.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              Page
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          ) : debouncedText ? (
            <Card className="p-10 text-center space-y-2">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-sm text-muted-foreground">
                Try different keywords or check for typos.
              </p>
            </Card>
          ) : (
            <Card className="p-10 text-center space-y-2">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">Start searching</h3>
              <p className="text-sm text-muted-foreground">
                Enter a keyword to find relevant content in Smarnika.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
