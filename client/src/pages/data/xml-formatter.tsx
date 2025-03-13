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

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [removeComments, setRemoveComments] = useState(false);
  const { toast } = useToast();

  const formatXml = () => {
    try {
      if (!input) {
        throw new Error("Please enter XML to format");
      }

      // Remove comments if enabled
      let xml = removeComments ? input.replace(/<!--[\s\S]*?-->/g, '') : input;

      // Remove whitespace between tags
      xml = xml.replace(/>\s+</g, '><');

      // Add newlines and indentation
      let formatted = '';
      let indent = 0;
      const lines = xml.split(/>\s*</);

      lines.forEach((line, i) => {
        // Add back the removed brackets
        if (i === 0) {
          line = line + '>';
        } else if (i === lines.length - 1) {
          line = '<' + line;
        } else {
          line = '<' + line + '>';
        }

        // Check if this is a closing tag
        if (line.match(/^<\//)) {
          indent--;
        }

        // Add indentation
        formatted += ' '.repeat(indent * indentSize) + line + '\n';

        // Check if this is not a self-closing tag and not a closing tag
        if (!line.match(/\/>$/) && !line.match(/^<\//)) {
          indent++;
        }
      });

      setOutput(formatted);
      toast({
        title: "XML formatted successfully",
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

  const validateXml = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "application/xml");
      const errorNode = doc.querySelector("parsererror");
      
      if (errorNode) {
        throw new Error("Invalid XML: " + errorNode.textContent);
      }

      toast({
        title: "XML is valid",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "XML is invalid",
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
    const blob = new Blob([output], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="XML Formatter"
      description="Format and validate XML documents"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Input XML</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your XML here..."
                className="font-mono min-h-[400px]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={removeComments}
                  onCheckedChange={setRemoveComments}
                  id="remove-comments"
                />
                <Label htmlFor="remove-comments">Remove comments</Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={validateXml} variant="outline">
                  Validate XML
                </Button>
                <Button onClick={formatXml}>
                  Format XML
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <Label>Formatted XML</Label>
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
              <pre className="whitespace-pre font-mono text-sm overflow-auto">
                {output || "Formatted XML will appear here..."}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 