import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Copy } from "lucide-react";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "snake" | "kebab";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [caseType, setCaseType] = useState<CaseType>("upper");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const convertCase = () => {
    try {
      if (!text) {
        throw new Error("Please enter text to convert");
      }

      let converted = "";
      switch (caseType) {
        case "upper":
          converted = text.toUpperCase();
          break;
        case "lower":
          converted = text.toLowerCase();
          break;
        case "title":
          converted = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
          break;
        case "sentence":
          converted = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, c => c.toUpperCase());
          break;
        case "camel":
          converted = text.toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
          break;
        case "snake":
          converted = text.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_]/g, '');
          break;
        case "kebab":
          converted = text.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '');
          break;
      }

      setResult(converted);
      toast({
        title: "Text converted successfully",
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
      title="Text Case Converter"
      description="Convert text between different cases"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label>Input Text</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert..."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <RadioGroup value={caseType} onValueChange={(value) => setCaseType(value as CaseType)}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upper" id="upper" />
                    <Label htmlFor="upper">UPPERCASE</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lower" id="lower" />
                    <Label htmlFor="lower">lowercase</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="title" id="title" />
                    <Label htmlFor="title">Title Case</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sentence" id="sentence" />
                    <Label htmlFor="sentence">Sentence case</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="camel" id="camel" />
                    <Label htmlFor="camel">camelCase</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="snake" id="snake" />
                    <Label htmlFor="snake">snake_case</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kebab" id="kebab" />
                    <Label htmlFor="kebab">kebab-case</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={convertCase} className="w-full">
              Convert Text
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <Label>Result</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {result}
                  </pre>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
