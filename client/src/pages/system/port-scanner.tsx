import { ToolLayout } from "@/components/tool-layout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PortScanner() {
  const [host, setHost] = useState("");
  
  return (
    <ToolLayout
      title="Port Scanner"
      description="Scan and check open ports"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
        >
          <Input 
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="Enter hostname or IP"
          />
          <Button>Scan</Button>
        </motion.div>
      </div>
    </ToolLayout>
  );
} 