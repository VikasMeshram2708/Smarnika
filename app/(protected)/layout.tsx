import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WsNavbar from "@/components/workspace/ws-navbar";
import { WsSidebar } from "@/components/workspace/ws-sidebar";
import React, { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<div className="w-64 bg-muted animate-pulse" />}>
        <WsSidebar />
      </Suspense>
      <main className="w-full flex flex-col gap-2">
        <div className="flex items-center">
          <SidebarTrigger />
          <WsNavbar />
        </div>
        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
}
