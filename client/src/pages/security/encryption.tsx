import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function EncryptionTools() {
  const [action, setAction] = useState("encrypt");
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const processText = () => {
    try {
      if (!text) {
        throw new Error("Please enter text to process");
      }
      if (!key) {
        throw new Error("Please enter an encryption key");
      }

      // Simple Caesar cipher for demonstration
      // In a real app, use a proper encryption library
      const shift = [...key].reduce((acc, char) => acc + char.charCodeAt(0), 0) % 26;
      
      const processed = [...text].map(char => {
        if (!/[a-zA-Z]/.test(char)) return char;
        
        const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        const charCode = char.charCodeAt(0);
        const shifted = action === "encrypt"
          ? (charCode - base + shift) % 26
          : (charCode - base - shift + 26) % 26;
        
        return String.fromCharCode(base + shifted);
      }).join('');

      setResult(processed);
      toast({
        title: `Text ${action}ed successfully`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Process failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Encryption Tools"
      description="Encrypt and decrypt text using various methods"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <RadioGroup value={action} onValueChange={setAction}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="encrypt" id="encrypt" />
                <Label htmlFor="encrypt">Encrypt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="decrypt" id="decrypt" />
                <Label htmlFor="decrypt">Decrypt</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label>Encryption Key</Label>
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your secret key"
              />
            </div>

            <div className="space-y-2">
              <Label>Input Text</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Enter text to ${action}`}
                className="min-h-[100px]"
              />
            </div>

            <Button onClick={processText} className="w-full">
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <Label>Result:</Label>
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
