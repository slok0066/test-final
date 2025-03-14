import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Tool } from "@/lib/tool-categories";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  index?: number;
  className?: string;
}

// Extended tool interface for our component
interface ExtendedTool extends Tool {
  tags?: string[];
}

export function ToolCard({ tool, index = 0, className }: ToolCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const extendedTool = tool as ExtendedTool;
  
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn("h-full", className)}
    >
      <Link href={tool.path}>
        <Card className="p-4 md:p-6 h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-primary/10 hover:border-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex flex-col h-full relative z-10">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shadow-sm group-hover:shadow-md">
                {tool.icon && <tool.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold group-hover:text-primary transition-colors truncate">
                  {tool.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1">
                  {tool.description}
                </p>
              </div>
            </div>
            
            {extendedTool.tags && extendedTool.tags.length > 0 && (
              <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
                {extendedTool.tags.slice(0, isMobile ? 2 : 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary/80 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {extendedTool.tags.length > (isMobile ? 2 : 3) && (
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary/80 transition-colors">
                    +{extendedTool.tags.length - (isMobile ? 2 : 3)}
                  </span>
                )}
              </div>
            )}
            
            <div className="absolute bottom-0 right-0 w-0 h-0 border-t-0 border-r-[20px] border-b-[20px] border-l-0 border-transparent border-r-primary/0 border-b-primary/0 group-hover:border-r-primary/10 group-hover:border-b-primary/10 transition-all duration-300"></div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}