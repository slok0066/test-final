import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    sentences: text.trim() === "" ? 0 : text.split(/[.!?]+/).length - 1,
    paragraphs: text.trim() === "" ? 0 : text.split(/\n\s*\n/).length,
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences and paragraphs in your text."
    >
      <Card className="overflow-hidden border-2 border-primary/10">
        <CardContent className="p-4">
          <Textarea
            placeholder="Type or paste your text here..."
            className="min-h-[200px] border-0 focus-visible:ring-0 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground capitalize mt-1">
                  {key}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </ToolLayout>
  );
}