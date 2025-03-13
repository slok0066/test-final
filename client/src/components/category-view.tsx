import { motion } from "framer-motion";
import { Category } from "@/lib/tool-categories";
import { ToolCard } from "./tool-card";

interface CategoryViewProps {
  category: Category;
}

export function CategoryView({ category }: CategoryViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <category.icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{category.name}</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            {category.tools.length} tools available
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {category.tools.map((tool, index) => (
          <ToolCard key={tool.path} tool={tool} index={index} />
        ))}
      </div>
    </motion.div>
  );
} 