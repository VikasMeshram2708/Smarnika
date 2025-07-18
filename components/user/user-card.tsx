import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Check, Dot, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export default async function UserCard() {
  const user = await currentUser();
  return (
    <Card className="w-full bg-card">
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4">
          <div className="flex justify-start gap-2">
            <Image
              src={user?.imageUrl || ""}
              alt={user?.fullName?.charAt(0) || "U"}
              width={32}
              height={24}
              className="rounded-full h-10 w-10"
            />
            <div className="flex flex-col">
              <CardTitle>{user?.fullName ?? "Name"} Smarnika</CardTitle>
              <CardDescription className="flex items-center">
                Free Plan
                <span className="flex items-center gap-1">
                  <Dot />1 Member
                </span>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex flex-col items-start">
        <div className="p-2 hover:bg-secondary flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Avatar>
            <AvatarFallback>{user?.fullName?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>
          <p className="text-xs">{user?.fullName} Smarnika</p>
          <span className="text-xs text-muted-foreground">
            <Check className="w-5 h-5" />
          </span>
        </div>

        <SignOutButton>
          <Button variant={"ghost"}>
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </SignOutButton>
      </CardContent>
      <CardFooter className="border-t">
        <p className="text-xs text-muted-foreground">
          Smarnika made with ❤️ v0.0.1
        </p>
      </CardFooter>
    </Card>
  );
}
