import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function ProbabilityCalculator() {
  const [type, setType] = useState("simple");
  const [total, setTotal] = useState("");
  const [favorable, setFavorable] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const calculate = () => {
    try {
      const totalNum = parseFloat(total);
      const favorableNum = parseFloat(favorable);

      if (isNaN(totalNum) || isNaN(favorableNum)) {
        throw new Error("Please enter valid numbers");
      }

      if (totalNum < favorableNum) {
        throw new Error("Total events must be greater than favorable events");
      }

      if (totalNum <= 0) {
        throw new Error("Total events must be greater than 0");
      }

      const probability = favorableNum / totalNum;
      const percentage = (probability * 100).toFixed(2);
      const odds = `${favorableNum} : ${totalNum - favorableNum}`;

      setResult(`
        Probability: ${probability.toFixed(4)}
        Percentage: ${percentage}%
        Odds: ${odds}
      `);

      toast({
        title: "Calculation complete",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Calculation failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Probability Calculator"
      description="Calculate odds and probabilities"
    >
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <RadioGroup value={type} onValueChange={setType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="simple" id="simple" />
                <Label htmlFor="simple">Simple Probability</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="complex" id="complex" disabled />
                <Label htmlFor="complex" className="text-muted-foreground">
                  Complex Probability (Coming soon)
                </Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total">Total Events</Label>
                <Input
                  id="total"
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="e.g., 52 for a deck of cards"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favorable">Favorable Events</Label>
                <Input
                  id="favorable"
                  type="number"
                  value={favorable}
                  onChange={(e) => setFavorable(e.target.value)}
                  placeholder="e.g., 4 for all aces"
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Probability
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-muted rounded-lg"
              >
                <Label>Results:</Label>
                <pre className="font-mono text-sm mt-2 whitespace-pre-line">
                  {result}
                </pre>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
