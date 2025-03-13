import { ToolLayout } from "@/components/tool-layout";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EnvManager() {
  const [envContent, setEnvContent] = useState("");
  
  return (
    <ToolLayout
      title="Environment Variable Manager"
      description="Manage and generate .env files"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Textarea
            value={envContent}
            onChange={(e) => setEnvContent(e.target.value)}
            placeholder="Enter your environment variables here..."
            className="font-mono h-[400px]"
          />
        </motion.div>
        <div className="flex gap-2">
          <Button>Generate .env</Button>
          <Button variant="outline">Download</Button>
        </div>
      </div>
    </ToolLayout>
  );
} 