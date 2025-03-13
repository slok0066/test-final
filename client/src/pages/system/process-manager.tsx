import { ToolLayout } from "@/components/tool-layout";
import { motion } from "framer-motion";

export default function ProcessManager() {
  return (
    <ToolLayout
      title="Process Manager"
      description="Monitor and manage system processes"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>Coming soon...</div>
      </motion.div>
    </ToolLayout>
  );
} 