/**
 * This is the button to add a new page
 */
"use client";

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import WsEditor from "./ws-editor";
import { useState } from "react";

export default function WsAddPageBtn() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenChange(toggleState: boolean) {
    if (toggleState) {
      setIsOpen(toggleState);
    } else {
      setIsOpen((prev) => !prev);
    }
  }
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Plus className="cursor-pointer w-5 h-5 text-muted-foreground" />
        </DialogTrigger>
        <DialogContent className="overflow-y-auto">
          <DialogHeader className="hidden">
            <DialogTitle>Add a new page</DialogTitle>
            <DialogDescription>
              Create a new page to organize your thoughts and ideas.
            </DialogDescription>
          </DialogHeader>
          <WsEditor handleOpenChange={handleOpenChange} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
