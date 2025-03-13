import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

const FORMATS = [
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "xml", label: "XML" },
];

export default function FormatConverter() {
  const [input, setInput] = useState("");
  const [fromFormat, setFromFormat] = useState("json");
  const [toFormat, setToFormat] = useState("yaml");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      // Basic conversion logic for now - can be expanded later
      if (fromFormat === "json" && toFormat === "yaml") {
        const parsed = JSON.parse(input);
        // Simple YAML-like format for demonstration
        const yaml = JSON.stringify(parsed, null, 2)
          .replace(/[{]/g, "")
          .replace(/[}]/g, "")
          .replace(/"/g, "");
        setOutput(yaml);
      } else {
        setOutput("Conversion between these formats is not implemented yet.");
      }

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
      title="Data Format Converter"
      description="Convert between different data formats like JSON, YAML, and XML."
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Select value={fromFormat} onValueChange={setFromFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="From format" />
                  </SelectTrigger>
                  <SelectContent>
                    {FORMATS.map(format => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={toFormat} onValueChange={setToFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="To format" />
                  </SelectTrigger>
                  <SelectContent>
                    {FORMATS.map(format => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Card>
            <CardContent className="pt-6">
              <Textarea
                placeholder={`Enter ${fromFormat.toUpperCase()} data...`}
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
                placeholder={`Converted ${toFormat.toUpperCase()} will appear here...`}
              />
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-center">
          <Button size="lg" onClick={convert}>Convert</Button>
        </div>
      </div>
    </ToolLayout>
  );
}
