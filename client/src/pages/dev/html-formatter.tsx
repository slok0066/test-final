import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download } from "lucide-react";
import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [wrapLines, setWrapLines] = useState(true);
  const { toast } = useToast();

  const formatHtml = async () => {
    try {
      if (!input) {
        throw new Error("Please enter HTML to format");
      }

      const formatted = await prettier.format(input, {
        parser: "html",
        plugins: [htmlParser],
        printWidth: wrapLines ? 80 : 120,
      });

      setOutput(formatted);
      toast({
        title: "HTML formatted successfully",
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
      title="HTML Formatter"
      description="Format and prettify HTML code with proper indentation."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <Card>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Paste your HTML here..."
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
              placeholder="Formatted HTML will appear here..."
            />
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center mt-4">
        <Button size="lg" onClick={formatHtml}>Format HTML</Button>
      </div>
    </ToolLayout>
  );
}
