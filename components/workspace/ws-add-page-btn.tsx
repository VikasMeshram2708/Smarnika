/**
 * This is the button to add a new page
 */

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import WsPageForm from "./ws-page-form";

export default function WsAddPageBtn() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <Plus className="cursor-pointer w-5 h-5 text-muted-foreground" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new page</DialogTitle>
            <DialogDescription>
              Create a new page to organize your thoughts and ideas.
            </DialogDescription>
          </DialogHeader>
          <Card className="p-0 border-0 shadow-none bg-card">
            <CardContent className="p-0">
              <WsPageForm />
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
