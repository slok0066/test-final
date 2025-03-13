import { motion } from "framer-motion";
import { Category } from "@/lib/tool-categories";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useState, useEffect } from "react";

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryNav({ categories, activeCategory, onSelectCategory }: CategoryNavProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className={cn(
        "flex space-x-2 p-1",
        isMobile ? "pb-3" : "p-1"
      )}>
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
                activeCategory === category.name && "bg-primary text-primary-foreground",
                isMobile && "px-3 py-2 text-xs"
              )}
              onClick={() => onSelectCategory(category.name)}
            >
              <category.icon className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
              <span className={cn(isMobile ? "max-w-[60px] truncate" : "")}>{category.name}</span>
            </Button>
          </motion.div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-2" />
    </ScrollArea>
  );
} 