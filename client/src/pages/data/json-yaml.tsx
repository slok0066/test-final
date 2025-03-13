import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Copy, ArrowRightLeft } from "lucide-react";
import yaml from 'js-yaml';

export default function JsonYamlConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"json2yaml" | "yaml2json">("json2yaml");
  const { toast } = useToast();

  const convert = () => {
    try {
      if (!input.trim()) {
        throw new Error("Please enter some text to convert");
      }

      if (mode === "json2yaml") {
        const jsonData = JSON.parse(input);
        const yamlStr = yaml.dump(jsonData, {
          indent: 2,
          lineWidth: -1,
          noRefs: true,
        });
        setOutput(yamlStr);
      } else {
        const jsonData = yaml.load(input);
        const jsonStr = JSON.stringify(jsonData, null, 2);
        setOutput(jsonStr);
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

  const toggleMode = () => {
    setMode(mode === "json2yaml" ? "yaml2json" : "json2yaml");
    setInput(output);
    setOutput("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      toast({
        title: "Copied to clipboard",
        variant: "default",
      });
    });
  };

  return (
    <ToolLayout
      title="JSON <> YAML Converter"
      description="Convert between JSON and YAML formats"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <Label>{mode === "json2yaml" ? "JSON Input" : "YAML Input"}</Label>
              <Button variant="outline" size="sm" onClick={toggleMode}>
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Switch Mode
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "json2yaml" ? "Enter JSON..." : "Enter YAML..."}
              className="font-mono min-h-[400px]"
            />
            <Button onClick={convert} className="w-full">
              Convert to {mode === "json2yaml" ? "YAML" : "JSON"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <Label>{mode === "json2yaml" ? "YAML Output" : "JSON Output"}</Label>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                disabled={!output}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 bg-muted rounded-lg min-h-[400px]">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {output || `Converted ${mode === "json2yaml" ? "YAML" : "JSON"} will appear here...`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 