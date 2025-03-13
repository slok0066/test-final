import { motion } from "framer-motion";
import { Tool } from "@/lib/tool-categories";
import { ToolCard } from "./tool-card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {tools.map((tool, index) => (
        <ToolCard key={tool.path} tool={tool} index={index} />
      ))}
    </motion.div>
  );
} 