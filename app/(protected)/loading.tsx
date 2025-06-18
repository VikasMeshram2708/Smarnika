import { LoaderCircle } from "lucide-react";

export default function loading() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <LoaderCircle calcMode="animate-spin" size={40} />
    </div>
  );
}
