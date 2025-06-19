import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { wsSidebarDdata } from "@/data";
import Link from "next/link";
import React from "react";

export default function WsMainNavigation() {
  return (
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
  );
}
