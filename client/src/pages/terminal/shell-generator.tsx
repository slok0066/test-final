import { ToolLayout } from "@/components/tool-layout";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ShellGenerator() {
  const [script, setScript] = useState("");
  
  return (
    <ToolLayout
      title="Shell Command Generator"
      description="Generate common shell commands"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Generated shell commands will appear here..."
            className="font-mono h-[400px]"
          />
        </motion.div>
        <Button>Copy to Clipboard</Button>
      </div>
    </ToolLayout>
  );
} 