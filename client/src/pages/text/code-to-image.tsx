import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy, Image as ImageIcon } from "lucide-react";
import html2canvas from 'html2canvas';

const themes = {
  "github-dark": "GitHub Dark",
  "github-light": "GitHub Light",
  "monokai": "Monokai",
  "dracula": "Dracula",
  "nord": "Nord",
};

const languages = {
  "typescript": "TypeScript",
  "javascript": "JavaScript",
  "python": "Python",
  "java": "Java",
  "cpp": "C++",
  "csharp": "C#",
  "go": "Go",
  "rust": "Rust",
  "ruby": "Ruby",
  "php": "PHP",
  "swift": "Swift",
  "kotlin": "Kotlin",
};

export default function CodeToImage() {
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("github-dark");
  const [language, setLanguage] = useState("typescript");
  const { toast } = useToast();

  const exportImage = async () => {
    const element = document.getElementById('code-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = 'code-snippet.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Image exported successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Code to Image"
      description="Convert code snippets to beautiful images"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themes).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languages).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Code</Label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="font-mono min-h-[400px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(code)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
            <Button onClick={exportImage}>
              <Download className="w-4 h-4 mr-2" />
              Export Image
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div
                id="code-preview"
                className={`p-6 rounded-lg overflow-hidden bg-${theme}`}
              >
                <pre className={`language-${language}`}>
                  <code>{code || "// Your code will appear here..."}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
} 