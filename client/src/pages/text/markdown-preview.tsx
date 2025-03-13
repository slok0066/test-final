import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState("");

  return (
    <ToolLayout
      title="Markdown Preview"
      description="Live preview of Markdown text with real-time rendering."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <Card className="overflow-hidden border-2 border-primary/10">
          <CardContent className="p-4">
            <Textarea
              placeholder="Type your markdown here..."
              className="min-h-[400px] border-0 focus-visible:ring-0 resize-none font-mono"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6 prose dark:prose-invert max-w-none min-h-[400px]">
            {markdown ? (
              <div dangerouslySetInnerHTML={{ __html: markdown }} />
            ) : (
              <p className="text-muted-foreground">
                Your preview will appear here...
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </ToolLayout>
  );
}
