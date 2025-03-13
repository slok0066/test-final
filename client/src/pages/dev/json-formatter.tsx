import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
      toast({
        title: "JSON formatted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">JSON Formatter</h1>
        <p className="text-muted-foreground">
          Format and validate your JSON data.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <Card>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Paste your JSON here..."
              className="min-h-[400px] font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Textarea
              readOnly
              className="min-h-[400px] font-mono"
              value={formatted}
              placeholder="Formatted JSON will appear here..."
            />
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center">
        <Button size="lg" onClick={formatJson}>Format JSON</Button>
      </div>
    </div>
  );
}
