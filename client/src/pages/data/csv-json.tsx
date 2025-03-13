import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convertToJson = () => {
    try {
      // Split into lines and filter out empty lines
      const lines = input.split('\n').filter(line => line.trim());
      if (lines.length === 0) {
        throw new Error("No data to convert");
      }

      // Get headers from first line
      const headers = lines[0].split(',').map(header => header.trim());

      // Convert remaining lines to objects
      const jsonData = lines.slice(1).map(line => {
        const values = line.split(',').map(val => val.trim());
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });

      setOutput(JSON.stringify(jsonData, null, 2));
      toast({
        title: "Conversion successful",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="CSV to JSON Converter"
      description="Convert CSV data to JSON format with proper parsing and validation."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <Card>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Paste your CSV here (comma-separated values)..."
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
              value={output}
              placeholder="JSON output will appear here..."
            />
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center mt-4">
        <Button size="lg" onClick={convertToJson}>Convert to JSON</Button>
      </div>
    </ToolLayout>
  );
}
