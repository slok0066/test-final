import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function JwtDebugger() {
  const [token, setToken] = useState("");
  const [decodedHeader, setDecodedHeader] = useState("");
  const [decodedPayload, setDecodedPayload] = useState("");

  const decodeToken = () => {
    try {
      const [header, payload] = token.split('.').slice(0, 2);
      setDecodedHeader(JSON.stringify(JSON.parse(atob(header)), null, 2));
      setDecodedPayload(JSON.stringify(JSON.parse(atob(payload)), null, 2));
    } catch (error) {
      setDecodedHeader("Invalid token");
      setDecodedPayload("Invalid token");
    }
  };

  return (
    <ToolLayout
      title="JWT Debugger"
      description="Debug and verify JWT tokens"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="font-mono h-[100px]"
          />
        </motion.div>

        <Button onClick={decodeToken}>Decode Token</Button>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h3 className="text-lg font-medium">Header</h3>
            <Textarea
              value={decodedHeader}
              readOnly
              className="font-mono h-[200px] bg-muted"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h3 className="text-lg font-medium">Payload</h3>
            <Textarea
              value={decodedPayload}
              readOnly
              className="font-mono h-[200px] bg-muted"
            />
          </motion.div>
        </div>
      </div>
    </ToolLayout>
  );
} 