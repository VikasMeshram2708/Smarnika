"use client";

import Link from "next/link";
import { Brain, UserCircle, UserPlus, Loader2 } from "lucide-react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

import { Button } from "./ui/button";

const LoadingIndicator = () => (
  <Button variant="ghost" size="sm" disabled className="gap-2">
    <Loader2 className="h-4 w-4 animate-spin" />
    Loading…
  </Button>
);

const SignedInMenu = () => (
  <Link href="/workspace">
    <Button variant="link" size="sm" className="cursor-pointer">
      Continue to Workspace
    </Button>
  </Link>
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
          <SignedInMenu />
        ) : (
          <GuestMenu />
        )}
      </div>
    </nav>
  );
}
