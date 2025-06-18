import {
  Calendar,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Dot,
  EllipsisVertical,
  Home,
  Inbox,
  LogOut,
  Mail,
  Plus,
  Search,
  Settings,
  UserPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import Image from "next/image";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export async function WsSidebar() {
  const session = await auth();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2" asChild>
                <SidebarMenuButton>
                  <Image
                    src={session?.user?.image || ""}
                    alt={session?.user?.name?.charAt(0) || "U"}
                    width={20}
                    height={20}
                  />
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <ChevronsUpDown />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 border-0 shadow-none p-0 ml-5">
                <Card className="w-full bg-card">
                  <CardHeader className="border-b">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-start gap-2">
                        <Image
                          src={session?.user?.image || ""}
                          alt={session?.user?.name?.charAt(0) || "U"}
                          width={32}
                          height={24}
                          className="rounded-full h-10 w-10"
                        />
                        <div className="flex flex-col">
                          <CardTitle>
                            {session?.user?.name ?? "Name"} Smarnika
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            Free Plan
                            <span className="flex items-center gap-1">
                              <Dot />1 Member
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>
                          <Settings />
                          Settings
                        </Badge>
                        <Badge>
                          <UserPlus />
                          Invite Members
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <CardDescription>
                      {session?.user?.name ?? "name"} Smarnika
                    </CardDescription>
                    <div className="p-2 hover:bg-secondary flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Avatar>
                        <AvatarFallback>
                          {session?.user?.name?.charAt(0) ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xs">{session?.user?.name} Smarnika</p>
                      <span className="text-xs text-muted-foreground">
                        <Check className="w-5 h-5" />
                      </span>
                    </div>
                    <Button variant={"ghost"}>
                      <Plus className="w-5 h-5" />
                      New Workspace
                    </Button>
                  </CardContent>
                  <CardFooter className="border-t">
                    <p className="text-xs text-muted-foreground">
                      Smarnika made with ❤️ v0.0.1
                    </p>
                  </CardFooter>
                </Card>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Image
                src={session?.user?.image || ""}
                alt={session?.user?.name?.charAt(0) || "U"}
                width={20}
                height={20}
              />
            </Button>
            <p className="text-sm font-medium">{session?.user?.name}</p>
          </SidebarGroupLabel> */}
          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
