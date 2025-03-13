import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<string[]>([]);

  const calculateDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: string[] = [];
    
    let i = 0, j = 0;
    while (i < lines1.length || j < lines2.length) {
      if (i >= lines1.length) {
        result.push(`+ ${lines2[j]}`);
        j++;
      } else if (j >= lines2.length) {
        result.push(`- ${lines1[i]}`);
        i++;
      } else if (lines1[i] !== lines2[j]) {
        result.push(`- ${lines1[i]}`);
        result.push(`+ ${lines2[j]}`);
        i++;
        j++;
      } else {
        result.push(`  ${lines1[i]}`);
        i++;
        j++;
      }
    }
    
    setDiff(result);
  };

  return (
    <ToolLayout
      title="Text Diff"
      description="Compare and find differences between two texts."
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Card className="overflow-hidden border-2 border-primary/10">
            <CardContent className="p-4">
              <Textarea
                placeholder="First text..."
                className="min-h-[200px] border-0 focus-visible:ring-0 resize-none"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-primary/10">
            <CardContent className="p-4">
              <Textarea
                placeholder="Second text..."
                className="min-h-[200px] border-0 focus-visible:ring-0 resize-none"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-center">
          <Button size="lg" onClick={calculateDiff}>Compare Texts</Button>
        </div>

        {diff.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <pre className="font-mono whitespace-pre-wrap">
                  {diff.map((line, index) => {
                    const color = line.startsWith('+') 
                      ? 'text-green-500' 
                      : line.startsWith('-')
                        ? 'text-red-500'
                        : 'text-muted-foreground';
                    return (
                      <div key={index} className={color}>
                        {line}
                      </div>
                    );
                  })}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  );
}
