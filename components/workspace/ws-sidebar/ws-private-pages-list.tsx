import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Ellipsis, Folder, Forward, Frame, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import WsDeletePageBtn from "./ws-delete-page-btn";
import { MinimalPage } from "@/utils/fetch-private-pages";

export default async function WsPrivatePagesList({
  privatePages,
}: {
  privatePages: MinimalPage[];
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
          <SidebarMenuAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Folder className="h-4 w-4" />
                  <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <WsDeletePageBtn pageId={page.id ?? ""} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuAction>
        </SidebarMenuItem>
      ))}
    </Suspense>
  );
}
