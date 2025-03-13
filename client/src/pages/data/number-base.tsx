import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

const BASES = [
  { value: 2, label: "Binary" },
  { value: 8, label: "Octal" },
  { value: 10, label: "Decimal" },
  { value: 16, label: "Hexadecimal" },
];

export default function NumberBase() {
  const [number, setNumber] = useState("");
  const [results, setResults] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const convert = (value: string) => {
    try {
      if (!value) {
        setResults({});
        return;
      }

      // Assume input is decimal
      const decimal = parseInt(value, 10);
      if (isNaN(decimal)) {
        throw new Error("Please enter a valid number");
      }

      const newResults: Record<number, string> = {};
      BASES.forEach(base => {
        newResults[base.value] = decimal.toString(base.value);
      });

      setResults(newResults);
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Number Base Converter"
      description="Convert numbers between decimal, binary, hexadecimal, and other bases."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="number">Enter a decimal number</Label>
              <Input
                id="number"
                type="text"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  convert(e.target.value);
                }}
                placeholder="Enter a number..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {BASES.map((base, index) => (
            <motion.div
              key={base.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <Label>{base.label}</Label>
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      Base-{base.value}
                    </code>
                  </div>
                  <p className="mt-2 font-mono break-all">
                    {results[base.value] || "0"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
