import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const generateHashes = async () => {
    try {
      if (!input) {
        throw new Error("Please enter some text to hash");
      }

      // Convert string to ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      // Generate different hashes
      const hashTypes = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const newHashes: Record<string, string> = {};

      for (const hashType of hashTypes) {
        const hashBuffer = await crypto.subtle.digest(hashType, data.buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        newHashes[hashType] = hashHex;
      }

      setHashes(newHashes);
      toast({
        title: "Hashes generated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Hash generation failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate various types of secure hashes for your text."
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Enter text to hash..."
              className="min-h-[200px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button size="lg" onClick={generateHashes}>Generate Hashes</Button>
        </div>

        {Object.keys(hashes).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4"
          >
            {Object.entries(hashes).map(([type, hash], index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{type}</h3>
                    <p className="font-mono text-sm break-all">{hash}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </ToolLayout>
  );
}
