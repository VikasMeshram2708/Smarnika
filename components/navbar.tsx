import { Brain, UserCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth, signIn } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { dropDownNavLinks } from "@/data";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="bg-background p-3">
      <div className="max-w-3xl lg:max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Brain />
            <Link href="/">Smarnika</Link>
          </h2>
          <div>
            {session && session.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"sm"}>
                    {/* <UserCircle /> */}
                    <Image
                      src={session.user.image || ""}
                      alt={session.user.name || ""}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    {session.user.name}
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
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {
                    redirect: true,
                    redirectTo: "/workspace",
                  });
                }}
              >
                <Button
                  type="submit"
                  className="rounded-full"
                  variant={"outline"}
                  size={"sm"}
                >
                  <UserCircle />
                  Sign In
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
