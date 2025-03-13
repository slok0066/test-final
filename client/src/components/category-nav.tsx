import { motion } from "framer-motion";
import { Category } from "@/lib/tool-categories";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryNav({ categories, activeCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 p-1">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={activeCategory === category.name ? "default" : "ghost"}
              className={cn(
                "flex items-center gap-2",
                activeCategory === category.name && "bg-primary text-primary-foreground"
              )}
              onClick={() => onSelectCategory(category.name)}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          </motion.div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
} 