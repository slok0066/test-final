import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Copy, Plus, Trash2 } from "lucide-react";

interface Replacement {
  find: string;
  replace: string;
}

export default function WordReplacer() {
  const [text, setText] = useState("");
  const [replacements, setReplacements] = useState<Replacement[]>([
    { find: "", replace: "" }
  ]);
  const [result, setResult] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { toast } = useToast();

  const addReplacement = () => {
    setReplacements([...replacements, { find: "", replace: "" }]);
  };

  const removeReplacement = (index: number) => {
    setReplacements(replacements.filter((_, i) => i !== index));
  };

  const updateReplacement = (index: number, field: keyof Replacement, value: string) => {
    setReplacements(replacements.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const replaceText = () => {
    try {
      let newText = text;
      replacements.forEach(({ find, replace }) => {
        if (!find) return;
        
        const regex = new RegExp(
          find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          caseSensitive ? 'g' : 'gi'
        );
        newText = newText.replace(regex, replace);
      });
      
      setResult(newText);
      toast({
        title: "Text replaced successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Replacement failed",
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
      title="Word Replacer"
      description="Find and replace multiple words or phrases in text"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to modify..."
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Replacements</Label>
                  <Button variant="outline" onClick={addReplacement} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                {replacements.map((replacement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-4 md:grid-cols-5 items-center"
                  >
                    <Input
                      className="md:col-span-2"
                      value={replacement.find}
                      onChange={(e) => updateReplacement(index, 'find', e.target.value)}
                      placeholder="Find..."
                    />
                    <Input
                      className="md:col-span-2"
                      value={replacement.replace}
                      onChange={(e) => updateReplacement(index, 'replace', e.target.value)}
                      placeholder="Replace with..."
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeReplacement(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={caseSensitive}
                  onCheckedChange={setCaseSensitive}
                  id="case-sensitive"
                />
                <Label htmlFor="case-sensitive">Case sensitive</Label>
              </div>

              <Button onClick={replaceText} className="w-full">
                Replace Text
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Result</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  disabled={!result}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg min-h-[200px]">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {result || "Modified text will appear here..."}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
