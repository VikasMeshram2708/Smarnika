import {
  CalendarPlus,
  ChevronsUpDown,
  HelpCircle,
  Plus,
  Settings,
  Trash2,
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
import { wsSidebarCollections, wsSidebarDdata } from "@/data";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function WsSidebar() {
  const { userId } = await auth();
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
        <SidebarGroup>
          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              {wsSidebarDdata.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Private Collections */}
        <SidebarGroup>
          <SidebarGroupLabel>Private</SidebarGroupLabel>
          <SidebarGroupAction>
            <Tooltip>
              <TooltipTrigger asChild>
                <Plus className="cursor-pointer w-5 h-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add a Plage Inside</p>
              </TooltipContent>
            </Tooltip>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {wsSidebarCollections.map((sb) => (
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/workspace/settings">
                    <Settings />
                    Settings
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/workspace/trash">
                    <Trash2 />
                    Trash
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
