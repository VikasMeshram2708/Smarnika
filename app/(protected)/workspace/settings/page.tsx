"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import { ChevronLeft, Mail, Trash2, Clock, User, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    // Get user's timezone
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background p-5">
        <div className="space-y-4 max-w-5xl mx-auto">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="space-y-6 max-w-5xl mx-auto">
        <Button variant="ghost" asChild className="hover:bg-accent">
          <Link href="/workspace" className="flex items-center gap-1">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to workspace</span>
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-8">
            {/* Appearance Section */}
            <div className="space-y-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">Appearance</CardTitle>
                <CardDescription>
                  Customize how the app looks on your device
                </CardDescription>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">
                      Change the color scheme
                    </p>
                  </div>
                </div>
                <ModeToggle />
              </div>
            </div>

            {/* Account Section */}
            <div className="space-y-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">Account</CardTitle>
                <CardDescription>
                  Manage your account information
                </CardDescription>
              </div>

              <div className="flex flex-col gap-6 p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <Image
                    src={user?.imageUrl || "/default-avatar.png"}
                    alt={user?.fullName || "User avatar"}
                    width={80}
                    height={80}
                    className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                  />
                  <div className="space-y-1">
                    <p className="text-xl font-semibold capitalize">
                      {user?.fullName || "Anonymous User"}
                    </p>
                    <Badge variant="secondary" className="gap-2">
                      <Mail className="h-3.5 w-3.5" />
                      {user?.primaryEmailAddress?.emailAddress || "No email"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Timezone</p>
                      <p className="text-sm text-muted-foreground">
                        {timezone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Account Created</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.createdAt?.toLocaleDateString() || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="space-y-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">Support</CardTitle>
                <CardDescription>
                  Get help or manage your account
                </CardDescription>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-destructive/10">
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently remove your account and all associated data
                      </p>
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove all your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => toast.info("Coming Soon!")}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
