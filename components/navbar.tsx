"use client";

import Link from "next/link";
import Image from "next/image";
import { Brain, UserCircle, UserPlus, Loader2 } from "lucide-react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { dropDownNavLinks } from "@/data";

const LoadingIndicator = () => (
  <Button variant="ghost" size="sm" disabled className="gap-2">
    <Loader2 className="h-4 w-4 animate-spin" />
    Loading…
  </Button>
);

const SignedInMenu = ({
  user,
}: {
  user: NonNullable<ReturnType<typeof useUser>["user"]>;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <Image
          src={user.imageUrl || "/default-avatar.png"}
          alt={user.fullName || "User"}
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="max-w-[120px] truncate">{user.fullName}</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      {dropDownNavLinks.map((item) => (
        <DropdownMenuItem key={item.label} asChild>
          <Link
            href={item.href}
            prefetch={item.href === "/workspace"}
            onMouseEnter={() => {
              // Preload workspace route on hover for better performance
              if (item.href === "/workspace") {
                import("@/app/(protected)/workspace/page");
              }
            }}
          >
            {item.label}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const GuestMenu = () => (
  <div className="flex items-center gap-2">
    <SignInButton mode="modal">
      <Button variant="link" className="flex items-center gap-1">
        <UserCircle className="h-4 w-4" />
        Sign In
      </Button>
    </SignInButton>
    <SignUpButton mode="modal">
      <Button className="flex items-center gap-1">
        <UserPlus className="h-4 w-4" />
        Sign Up
      </Button>
    </SignUpButton>
  </div>
);

export default function Navbar() {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <nav className="bg-background p-4 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold text-primary"
        >
          <Brain className="h-6 w-6" />
          Smarnika
        </Link>

        {/* Right-hand section */}
        {!isLoaded ? (
          <LoadingIndicator />
        ) : isSignedIn && user ? (
          <SignedInMenu user={user} />
        ) : (
          <GuestMenu />
        )}
      </div>
    </nav>
  );
}
