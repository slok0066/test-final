import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

type GeneratorType = "paragraphs" | "words" | "sentences";

export default function LoremGenerator() {
  const [count, setCount] = useState("3");
  const [type, setType] = useState<GeneratorType>("paragraphs");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur",
    "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui",
    "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const generateWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const sentence = Array(length).fill(null).map(generateWord);
    sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
    return sentence.join(" ") + ".";
  };

  const generateParagraph = () => {
    const length = Math.floor(Math.random() * 5) + 3;
    return Array(length).fill(null).map(generateSentence).join(" ");
  };

  const generate = () => {
    try {
      const num = parseInt(count);
      if (isNaN(num) || num < 1) {
        throw new Error("Please enter a valid number");
      }

      let generated = "";
      switch (type) {
        case "paragraphs":
          generated = Array(num).fill(null)
            .map(generateParagraph)
            .join("\n\n");
          break;
        case "sentences":
          generated = Array(num).fill(null)
            .map(generateSentence)
            .join(" ");
          break;
        case "words":
          generated = Array(num).fill(null)
            .map(generateWord)
            .join(" ");
          break;
      }

      setResult(generated);
      toast({
        title: "Text generated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied to clipboard",
        variant: "default",
      });
    });
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate Lorem Ipsum placeholder text"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={(value) => setType(value as GeneratorType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="words">Words</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Count</Label>
                <Input
                  type="number"
                  min="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="Enter number"
                />
              </div>

              <div className="flex items-end">
                <Button onClick={generate} className="w-full">
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Text</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  disabled={!result}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={result}
                readOnly
                className="min-h-[400px] font-serif"
                placeholder="Generated text will appear here..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
