import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ASCII_FONTS = {
  Standard: {
    A: "  █\n █ █\n█   █\n█████\n█   █",
    B: "████\n█   █\n████\n█   █\n████",
    C: " ████\n█\n█\n█\n ████",
    // Add more characters as needed
  },
  Block: {
    A: "▄▄▄▄▄\n█   █\n█████\n█   █\n█   █",
    B: "████\n█   █\n████\n█   █\n████",
    C: "▄████\n█\n█\n█\n▀████",
    // Add more characters as needed
  }
};

const FONTS = Object.keys(ASCII_FONTS);

export default function AsciiArt() {
  const [text, setText] = useState("");
  const [font, setFont] = useState("Standard");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateAscii = () => {
    if (!text) return;
    
    setIsLoading(true);
    try {
      // Simple ASCII art generation
      const asciiText = text.toUpperCase().split('').map(char => {
        return ASCII_FONTS[font][char] || char;
      }).join('  ');
      
      setResult(asciiText);
    } catch (error) {
      console.error("Failed to generate ASCII art:", error);
      setResult("Error generating ASCII art. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <ToolLayout
      title="ASCII Art Generator"
      description="Convert text into ASCII art"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <Textarea
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] font-mono resize-none"
          />
          <div className="space-y-4">
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger>
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={generateAscii} 
              className="w-full"
              disabled={!text || isLoading}
            >
              {isLoading ? "Generating..." : "Generate ASCII Art"}
            </Button>
          </div>
        </div>

        {result && (
          <div className="relative">
            <pre className="p-4 bg-muted rounded-lg overflow-x-auto font-mono text-sm whitespace-pre scrollbar-thin scrollbar-thumb-border scrollbar-track-muted">
              {result}
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                navigator.clipboard.writeText(result);
              }}
            >
              Copy
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
} 