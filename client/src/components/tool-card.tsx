import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tool } from "@/lib/tool-categories";
import { Link } from "wouter";
import { Badge } from "./ui/badge";
import { LucideIcon } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Extend the Tool type to include isNew property
interface ToolWithNew extends Tool {
  isNew?: boolean;
}

type ToolCardProps = 
  | { tool: ToolWithNew; index?: number }
  | { name: string; description: string; path: string; icon?: LucideIcon; isNew?: boolean };

export function ToolCard(props: ToolCardProps) {
  // Determine if we're using the tool object or individual props
  const isTool = 'tool' in props;
  
  // Extract values from either the tool object or individual props
  const name = isTool ? props.tool.name : props.name;
  const description = isTool ? props.tool.description : props.description;
  const path = isTool ? props.tool.path : props.path;
  const Icon = isTool ? props.tool.icon : props.icon;
  const isNew = isTool ? props.tool.isNew : props.isNew;

  return (
    <Link href={path}>
      <motion.div
        variants={item}
        className="cursor-pointer group h-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="h-full transition-all duration-200 hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/50 group-hover:bg-accent/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-5 w-5 text-primary" />}
                <CardTitle className="text-xl">{name}</CardTitle>
              </div>
              {isNew && (
                <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                  New
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm mt-2">{description}</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  );
}