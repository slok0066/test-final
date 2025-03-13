import { ToolLayout } from "@/components/tool-layout";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BashGenerator() {
  const [script, setScript] = useState("");
  
  return (
    <ToolLayout
      title="Bash Script Generator"
      description="Generate bash scripts from templates"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Generated bash script will appear here..."
            className="font-mono h-[400px]"
          />
        </motion.div>
        <div className="flex gap-2">
          <Button>Generate Script</Button>
          <Button variant="outline">Download</Button>
        </div>
      </div>
    </ToolLayout>
  );
} 