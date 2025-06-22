import { ChevronsUpDown } from "lucide-react";

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
import { currentUser } from "@clerk/nextjs/server";
import WsAddPageBtnWrapper from "./ws-add-page-btn-wrapper";
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
        <WsAddPageBtnWrapper />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* private pages */}
          <WsPrivatePagesList privatePages={privatePages ?? []} />
          {/* Default Pages */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export async function WsSidebar() {
  const user = await currentUser();
  return (
    <Sidebar>
      <SidebarHeader className="border-b-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <Image
                src="https://ik.imagekit.io/wciw9sobc/Smarnika/dark-logo.png?updatedAt=1750589675718"
                alt="Smarnika AI-powered personal knowledge management"
                width={32}
                height={32}
                className="rounded w-8 h-8 object-cover object-center"
              />
              Smarnika
            </h2>
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
      <SidebarFooter className="border-t-2">
        <SidebarGroupContent>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2" asChild>
              <SidebarMenuButton className="p-5">
                <Image
                  src={user?.imageUrl || ""}
                  alt={user?.fullName?.charAt(0) || "U"}
                  width={32}
                  height={32}
                  className="rounded-full w-8 h-8 object-cover object-center"
                />
                <p className="text-sm font-medium">{user?.fullName}</p>
                <ChevronsUpDown />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 border-0 shadow-none p-0 ml-5">
              <UserCard />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
}
