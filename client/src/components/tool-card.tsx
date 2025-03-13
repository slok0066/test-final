import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Tool } from "@/lib/tool-categories";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  index?: number;
  className?: string;
}

export function ToolCard({ tool, index = 0, className }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={cn("h-full", className)}
    >
      <Link href={tool.path}>
        <Card className="p-4 md:p-6 h-full hover:shadow-lg transition-all cursor-pointer group border-border hover:border-primary/50">
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <tool.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
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
            
            {tool.tags && tool.tags.length > 0 && (
              <div className="mt-auto pt-2 flex flex-wrap gap-1">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {tool.tags.length > 3 && (
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                    +{tool.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}