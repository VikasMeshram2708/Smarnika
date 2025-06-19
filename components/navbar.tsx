import { Brain, UserCircle, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { dropDownNavLinks } from "@/data";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default async function Navbar() {
  const session = await auth();
  const user = await currentUser();
  return (
    <nav className="bg-background p-3">
      <div className="max-w-3xl lg:max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-primary font-semibold flex items-center gap-2">
            <Brain />
            <Link href="/">Smarnika</Link>
          </h2>
          <div>
            {session && session.userId ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"sm"}>
                    {/* <UserCircle /> */}
                    <Image
                      src={user?.imageUrl || ""}
                      alt={user?.fullName || ""}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    {user?.fullName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {dropDownNavLinks.map((d) => (
                    <DropdownMenuItem key={d.label}>
                      <Link href={d.href}>{d.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <SignInButton>
                  <Button variant={"link"}>
                    <UserCircle />
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button>
                    <UserPlus />
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
