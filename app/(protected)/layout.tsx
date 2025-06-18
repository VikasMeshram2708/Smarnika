import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import WsNavbar from "@/components/workspace/ws-navbar";
import { WsSidebar } from "@/components/workspace/ws-sidebar";
import React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <WsSidebar />
      <main className="flex flex-col gap-2">
        <div className="flex items-center">
          <SidebarTrigger />
          <WsNavbar />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
