import { Category } from "@/lib/tool-categories";
import { motion } from "framer-motion";
import { ToolGrid } from "./tool-layout";
import { Card } from "./ui/card";

interface CategoryViewProps {
  category: Category;
}

export function CategoryView({ category }: CategoryViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-purple-600/10 border-none">
        <div className="flex items-center gap-6">
          <div className="p-3 rounded-xl bg-background shadow-sm">
            <category.icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{category.name}</h2>
            <p className="text-muted-foreground mt-1">
              {category.tools.length} tools available in this category
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">All Tools</h3>
          <p className="text-sm text-muted-foreground">
            Showing {category.tools.length} tools
          </p>
        </div>
        <ToolGrid tools={category.tools} />
      </div>
    </motion.div>
  );
} 