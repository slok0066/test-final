import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

const UNITS = {
  energy: ["joules", "calories", "kilocalories", "electron-volts", "kilowatt-hours"],
  pressure: ["pascals", "atmospheres", "bars", "torr", "psi"],
  force: ["newtons", "dynes", "pound-force", "kilogram-force"],
  frequency: ["hertz", "kilohertz", "megahertz", "gigahertz"],
};

type UnitCategory = keyof typeof UNITS;

const CONVERSION_FACTORS: Record<string, Record<string, number>> = {
  energy: {
    joules: 1,
    calories: 0.239006,
    kilocalories: 0.000239006,
    "electron-volts": 6.242e18,
    "kilowatt-hours": 2.778e-7
  },
  pressure: {
    pascals: 1,
    atmospheres: 9.869e-6,
    bars: 1e-5,
    torr: 0.00750062,
    psi: 0.000145038
  },
  force: {
    newtons: 1,
    dynes: 100000,
    "pound-force": 0.224809,
    "kilogram-force": 0.101972
  },
  frequency: {
    hertz: 1,
    kilohertz: 0.001,
    megahertz: 1e-6,
    gigahertz: 1e-9
  }
};

export default function UnitConversions() {
  const [category, setCategory] = useState<UnitCategory>("energy");
  const [fromUnit, setFromUnit] = useState(UNITS[category][0]);
  const [toUnit, setToUnit] = useState(UNITS[category][1]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        throw new Error("Please enter a valid number");
      }

      // Convert to base unit first
      const baseValue = numValue / CONVERSION_FACTORS[category][fromUnit];
      // Then convert to target unit
      const converted = baseValue * CONVERSION_FACTORS[category][toUnit];

      setResult(converted.toExponential(6));
      toast({
        title: "Conversion complete",
        variant: "default",
      });
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
      title="Scientific Unit Conversions"
      description="Convert between various scientific units of measurement"
    >
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={category} 
                onValueChange={(value: UnitCategory) => {
                  setCategory(value);
                  setFromUnit(UNITS[value][0]);
                  setToUnit(UNITS[value][1]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(UNITS).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS[category].map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS[category].map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value to convert"
              />
            </div>

            <Button onClick={convert} className="w-full">Convert</Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-muted rounded-lg"
              >
                <Label>Result:</Label>
                <p className="font-mono text-lg mt-1">
                  {value} {fromUnit} = {result} {toUnit}
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
