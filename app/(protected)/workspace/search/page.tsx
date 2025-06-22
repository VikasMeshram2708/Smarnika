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
        if (res?.success) {
          setData(res.pages ?? []);
        } else {
          setData([]);
        }
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
    <div className="bg-background min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Smarnika</h1>
          <p className="text-muted-foreground">Search your knowledge base</p>
        </div>

        <Card className="p-2 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full pl-10 py-6 text-lg focus-visible:ring-0 border-none shadow-none"
              placeholder="Search pages, documents, or keywords..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
            )}
          </div>
        </Card>

        <div className="space-y-2">
          {loading && debouncedText ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-full h-16 rounded-lg" />
              ))}
            </div>
          ) : data.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Found {data.length} result{data.length !== 1 ? "s" : ""}
              </p>
              {data.map((page) => (
                <Link key={page.id} href={`/workspace/${page.id}`}>
                  <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-primary">
                          {page.title}
                        </h3>

                        <div className="mt-2 flex gap-2">
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
          ) : debouncedText ? (
            <Card className="p-8 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground">
                No results found
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try different keywords or check your spelling
              </p>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground">
                Search Smarnika
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Enter keywords to find pages and documents
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
