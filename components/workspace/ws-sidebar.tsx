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
import { auth, currentUser } from "@clerk/nextjs/server";
import WsAddPageBtn from "./ws-add-page-btn";
import prisma from "@/utils/prisma";
import WsPrivatePagesList from "./ws-sidebar/ws-private-pages-list";
import WsMainNavigation from "./ws-sidebar/ws-main-navigation";
import WsDefaultActions from "./ws-sidebar/ws-default-actions";

export async function WsSidebar() {
  const { userId } = await auth();
  const user = await currentUser();
  const privatePages = await prisma.page.findMany({
    where: {
      userId: userId ?? "",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

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

        {/* Private Collections */}
        <SidebarGroup>
          <SidebarGroupLabel>Private</SidebarGroupLabel>
          <SidebarGroupAction asChild>
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
