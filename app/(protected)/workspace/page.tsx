import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Search, Inbox, Settings } from "lucide-react";
import Link from "next/link";

export default function WorkspacePage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to your Workspace</h1>
        <p className="text-muted-foreground">
          Create, organize, and collaborate on your projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Page
            </CardTitle>
            <CardDescription>Start a new document or project</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/workspace/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Page
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Pages
            </CardTitle>
            <CardDescription>Find your documents quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/workspace/search">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              Inbox
            </CardTitle>
            <CardDescription>View your recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/workspace/inbox">
                <Inbox className="h-4 w-4 mr-2" />
                View Inbox
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>Manage your workspace settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/workspace/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Pages</h2>
        <div className="text-muted-foreground text-center py-8">
          <p>Your recent pages will appear here</p>
          <p className="text-sm mt-2">
            Start creating pages to see them listed
          </p>
        </div>
      </div>
    </div>
  );
}
