import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-64 hidden md:block border-r bg-white">
        <Card className="m-4 p-4 flex items-center gap-2">
            <Package className="w-6 h-6" />
            <h1 className="font-bold text-lg">Product Dashboard</h1>
        </Card>
    </aside>
  );
};
