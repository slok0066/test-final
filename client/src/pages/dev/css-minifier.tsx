import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download } from "lucide-react";

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removeComments, setRemoveComments] = useState(true);
  const [removeWhitespace, setRemoveWhitespace] = useState(true);
  const { toast } = useToast();

  const minifyCss = () => {
    try {
      if (!input) {
        throw new Error("Please enter CSS to minify");
      }

      let minified = input;

      if (removeComments) {
        // Remove comments
        minified = minified.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
      }

      if (removeWhitespace) {
        // Remove whitespace
        minified = minified
          .replace(/\s+/g, ' ')
          .replace(/\s*([{}:;,])\s*/g, '$1')
          .replace(/;\}/g, '}')
          .trim();
      }

      setOutput(minified);
      
      const savings = ((input.length - minified.length) / input.length * 100).toFixed(1);
      toast({
        title: "CSS minified successfully",
        description: `Reduced by ${savings}%`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Minification failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      toast({
        title: "Copied to clipboard",
        variant: "default",
      });
    });
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="CSS Minifier"
      description="Minify and optimize CSS code"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Input CSS</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your CSS code here..."
                className="font-mono min-h-[400px]"
              />
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={removeComments}
                  onCheckedChange={setRemoveComments}
                  id="remove-comments"
                />
                <Label htmlFor="remove-comments">Remove comments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={removeWhitespace}
                  onCheckedChange={setRemoveWhitespace}
                  id="remove-whitespace"
                />
                <Label htmlFor="remove-whitespace">Remove whitespace</Label>
              </div>
            </div>

            <Button onClick={minifyCss} className="w-full">
              Minify CSS
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <Label>Minified CSS</Label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={downloadFile}
                  disabled={!output}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg min-h-[400px]">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {output || "Minified CSS will appear here..."}
              </pre>
            </div>
            {output && (
              <div className="text-sm text-muted-foreground">
                Original size: {input.length} bytes
                <br />
                Minified size: {output.length} bytes
                <br />
                Reduction: {((input.length - output.length) / input.length * 100).toFixed(1)}%
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 