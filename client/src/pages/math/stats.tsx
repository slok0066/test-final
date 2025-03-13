import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

interface Stats {
  mean: number;
  median: number;
  mode: number[];
  standardDeviation: number;
  variance: number;
  range: number;
}

export default function StatisticalCalculator() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const { toast } = useToast();

  const calculateStats = () => {
    try {
      const numbers = input
        .split(/[,\s]+/)
        .map(num => parseFloat(num.trim()))
        .filter(num => !isNaN(num));

      if (numbers.length === 0) {
        throw new Error("Please enter valid numbers separated by commas or spaces");
      }

      // Sort numbers for median and mode calculations
      const sorted = [...numbers].sort((a, b) => a - b);
      
      // Calculate mean
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
      const mean = sum / numbers.length;

      // Calculate median
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];

      // Calculate mode
      const frequency: Record<number, number> = {};
      let maxFreq = 0;
      numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        maxFreq = Math.max(maxFreq, frequency[num]);
      });
      const mode = Object.entries(frequency)
        .filter(([_, freq]) => freq === maxFreq)
        .map(([num]) => parseFloat(num));

      // Calculate variance and standard deviation
      const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
      const variance = squaredDiffs.reduce((acc, curr) => acc + curr, 0) / numbers.length;
      const standardDeviation = Math.sqrt(variance);

      // Calculate range
      const range = sorted[sorted.length - 1] - sorted[0];

      setStats({
        mean,
        median,
        mode,
        standardDeviation,
        variance,
        range
      });

      toast({
        title: "Calculations complete",
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
      title="Statistical Calculator"
      description="Calculate mean, median, mode, and more statistical measures"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Numbers (separated by commas or spaces)</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers, e.g: 1, 2, 3, 4, 5"
                className="font-mono"
              />
            </div>

            <Button onClick={calculateStats} className="w-full">
              Calculate Statistics
            </Button>

            {stats && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Mean</Label>
                    <p className="font-mono text-lg">{stats.mean.toFixed(4)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Median</Label>
                    <p className="font-mono text-lg">{stats.median.toFixed(4)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Mode</Label>
                    <p className="font-mono text-lg">
                      {stats.mode.map(n => n.toFixed(4)).join(", ")}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Standard Deviation</Label>
                    <p className="font-mono text-lg">{stats.standardDeviation.toFixed(4)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Variance</Label>
                    <p className="font-mono text-lg">{stats.variance.toFixed(4)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Range</Label>
                    <p className="font-mono text-lg">{stats.range.toFixed(4)}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
