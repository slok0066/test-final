import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
];

export default function CodeBeautifier() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [formatted, setFormatted] = useState("");
  const { toast } = useToast();

  const formatCode = () => {
    try {
      // Basic indentation for now
      const formatted = input
        .split("\n")
        .map(line => "  " + line.trim())
        .join("\n");

      setFormatted(formatted);
      toast({
        title: "Code formatted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Formatting failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Code Beautifier"
      description="Format and beautify code in various programming languages."
    >
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <Select
              value={language}
              onValueChange={setLanguage}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                placeholder="Paste your code here..."
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
                placeholder="Formatted code will appear here..."
              />
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-center">
          <Button size="lg" onClick={formatCode}>Format Code</Button>
        </div>
      </div>
    </ToolLayout>
  );
}
