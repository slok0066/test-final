import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function RandomGenerator() {
  const [type, setType] = useState("number");
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [length, setLength] = useState("10");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const generateRandom = () => {
    try {
      if (type === "number") {
        const minNum = parseInt(min);
        const maxNum = parseInt(max);
        const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        setResult(random.toString());
      } else {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const len = parseInt(length);
        for (let i = 0; i < len; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setResult(result);
      }

      toast({
        title: "Generated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please check your input values",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Random Generator"
      description="Generate random numbers and strings"
    >
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <RadioGroup value={type} onValueChange={setType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="number" id="number" />
                <Label htmlFor="number">Random Number</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="string" id="string" />
                <Label htmlFor="string">Random String</Label>
              </div>
            </RadioGroup>

            {type === "number" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min">Minimum</Label>
                  <Input
                    id="min"
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max">Maximum</Label>
                  <Input
                    id="max"
                    type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="length">String Length</Label>
                <Input
                  id="length"
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
            )}

            <Button onClick={generateRandom} className="w-full">
              Generate Random {type === "number" ? "Number" : "String"}
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-muted rounded-lg"
              >
                <Label>Result:</Label>
                <p className="font-mono text-lg mt-1">{result}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
