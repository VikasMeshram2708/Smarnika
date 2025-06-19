import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Page } from "@/lib/generated/prisma";
import { Frame, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function WsPrivatePagesList({
  privatePages,
}: {
  privatePages: Page[];
}) {
  return (
    <Suspense
      fallback={
        <div>
          <LoaderCircle className="animate-spin" />
        </div>
      }
    >
      {/* user private pages */}
      {privatePages.map((page) => (
        <SidebarMenuItem key={page.id}>
          <SidebarMenuButton asChild>
            <Link href={`/workspace/${page.id}`}>
              {page.logo ? page.logo : <Frame />}
              <span>{page.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </Suspense>
  );
}
