import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function WsDefaultActions() {
  return (
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
  );
}
