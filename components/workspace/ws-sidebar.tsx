import {
  CalendarPlus,
  ChevronsUpDown,
  HelpCircle,
  UserPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import UserCard from "../user/user-card";
import { wsDefaultPages } from "@/data";
import Link from "next/link";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import WsAddPageBtn from "./ws-add-page-btn";
import WsPrivatePagesList from "./ws-sidebar/ws-private-pages-list";
import WsMainNavigation from "./ws-sidebar/ws-main-navigation";
import WsDefaultActions from "./ws-sidebar/ws-default-actions";
import { fetchMinimalPrivatePages } from "@/utils/fetch-private-pages";
import { Suspense } from "react";

// Separate component for private pages to enable lazy loading
async function PrivatePagesSection() {
  const privatePages = await fetchMinimalPrivatePages();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Private</SidebarGroupLabel>
      <SidebarGroupAction>
        <WsAddPageBtn />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* private pages */}
          <WsPrivatePagesList privatePages={privatePages ?? []} />
          {/* Default Pages */}
          {wsDefaultPages.map((sb) => (
            <SidebarMenuItem key={sb.label}>
              <SidebarMenuButton asChild>
                <Link href={sb.href}>
                  {sb.icon}
                  <span>{sb.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export async function WsSidebar() {
  const user = await currentUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2" asChild>
                <SidebarMenuButton>
                  <Image
                    src={user?.imageUrl || ""}
                    alt={user?.fullName?.charAt(0) || "U"}
                    width={20}
                    height={20}
                  />
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <ChevronsUpDown />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 border-0 shadow-none p-0 ml-5">
                <UserCard />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <WsMainNavigation />

        {/* Private Collections - Wrapped in Suspense for better performance */}
        <Suspense
          fallback={
            <SidebarGroup>
              <SidebarGroupLabel>Private</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="p-2 text-sm text-muted-foreground">
                  Loading...
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          }
        >
          <PrivatePagesSection />
        </Suspense>

        {/* Default Actions */}
        <WsDefaultActions />
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/workspace/settings">
                  <UserPlus />
                  Invite Members
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <div className="flex items-center gap-2 justify-between">
          <Button variant={"ghost"} size={"icon"}>
            <CalendarPlus />
          </Button>
          <HelpCircle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
