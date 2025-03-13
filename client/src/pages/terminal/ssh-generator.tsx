import { ToolLayout } from "@/components/tool-layout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SshGenerator() {
  const [keyName, setKeyName] = useState("");
  
  return (
    <ToolLayout
      title="SSH Key Generator"
      description="Generate and manage SSH keys"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Input
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="Enter key name"
          />
          <Button>Generate Key Pair</Button>
        </motion.div>
      </div>
    </ToolLayout>
  );
} 