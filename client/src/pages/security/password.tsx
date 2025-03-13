import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Copy } from "lucide-react";

export default function PasswordGenerator() {
  const [length, setLength] = useState("12");
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const generatePassword = () => {
    try {
      const nums = "0123456789";
      const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      let chars = lowercase;
      if (includeNumbers) chars += nums;
      if (includeSymbols) chars += symbols;
      if (includeUppercase) chars += uppercase;

      let result = "";
      const len = parseInt(length);
      
      if (len < 4 || len > 100) {
        throw new Error("Password length must be between 4 and 100 characters");
      }

      for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      setPassword(result);
      toast({
        title: "Password generated",
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
    navigator.clipboard.writeText(password).then(() => {
      toast({
        title: "Password copied to clipboard",
        variant: "default",
      });
    });
  };

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure random passwords with custom settings"
    >
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="length">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="4"
                max="100"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                />
                <Label htmlFor="numbers">Include Numbers</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                />
                <Label htmlFor="symbols">Include Symbols</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                />
                <Label htmlFor="uppercase">Include Uppercase Letters</Label>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full">
              Generate Password
            </Button>

            {password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
                  <div className="font-mono break-all">{password}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    className="flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
