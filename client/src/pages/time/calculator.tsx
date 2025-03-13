import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { addDays, differenceInDays, differenceInMonths, differenceInYears } from "date-fns";

export default function DateCalculator() {
  const [date1, setDate1] = useState<Date>();
  const [date2, setDate2] = useState<Date>();
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const calculateDifference = () => {
    try {
      if (!date1 || !date2) {
        throw new Error("Please select both dates");
      }

      const days = Math.abs(differenceInDays(date2, date1));
      const months = Math.abs(differenceInMonths(date2, date1));
      const years = Math.abs(differenceInYears(date2, date1));

      setResult(`
        Days: ${days}
        Months: ${months}
        Years: ${years}
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
      title="Date Calculator"
      description="Calculate time between dates"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label>First Date</Label>
                <Calendar
                  mode="single"
                  selected={date1}
                  onSelect={setDate1}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <Label>Second Date</Label>
                <Calendar
                  mode="single"
                  selected={date2}
                  onSelect={setDate2}
                  className="rounded-md border"
                />
              </div>
            </div>

            <Button 
              onClick={calculateDifference} 
              className="w-full mt-6"
            >
              Calculate Difference
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 bg-muted rounded-lg"
              >
                <Label>Time Difference:</Label>
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
