import { LoaderCircle } from "lucide-react";

export default function loading() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <LoaderCircle size={96} className="animate-spin text-primary" />
    </div>
  );
}
