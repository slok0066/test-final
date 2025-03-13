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
  length: ["meters", "kilometers", "miles", "feet", "inches"],
  weight: ["kilograms", "grams", "pounds", "ounces"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
};

type UnitCategory = keyof typeof UNITS;

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>("length");
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

      let converted: number;

      // Basic conversion logic - can be expanded with more accurate conversions
      if (category === "length") {
        // Convert everything to meters first
        let inMeters = numValue;
        if (fromUnit === "kilometers") inMeters = numValue * 1000;
        if (fromUnit === "miles") inMeters = numValue * 1609.34;
        if (fromUnit === "feet") inMeters = numValue * 0.3048;
        if (fromUnit === "inches") inMeters = numValue * 0.0254;

        // Convert from meters to target unit
        if (toUnit === "kilometers") converted = inMeters / 1000;
        else if (toUnit === "miles") converted = inMeters / 1609.34;
        else if (toUnit === "feet") converted = inMeters / 0.3048;
        else if (toUnit === "inches") converted = inMeters / 0.0254;
        else converted = inMeters;
      } else if (category === "weight") {
        // Convert everything to kilograms first
        let inKg = numValue;
        if (fromUnit === "grams") inKg = numValue / 1000;
        if (fromUnit === "pounds") inKg = numValue * 0.453592;
        if (fromUnit === "ounces") inKg = numValue * 0.0283495;

        // Convert from kilograms to target unit
        if (toUnit === "grams") converted = inKg * 1000;
        else if (toUnit === "pounds") converted = inKg / 0.453592;
        else if (toUnit === "ounces") converted = inKg / 0.0283495;
        else converted = inKg;
      } else {
        // Temperature conversions
        if (fromUnit === "celsius") {
          if (toUnit === "fahrenheit") converted = (numValue * 9/5) + 32;
          else if (toUnit === "kelvin") converted = numValue + 273.15;
          else converted = numValue;
        } else if (fromUnit === "fahrenheit") {
          if (toUnit === "celsius") converted = (numValue - 32) * 5/9;
          else if (toUnit === "kelvin") converted = (numValue - 32) * 5/9 + 273.15;
          else converted = numValue;
        } else { // kelvin
          if (toUnit === "celsius") converted = numValue - 273.15;
          else if (toUnit === "fahrenheit") converted = (numValue - 273.15) * 9/5 + 32;
          else converted = numValue;
        }
      }

      setResult(converted.toFixed(4));
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
      title="Unit Converter"
      description="Convert between different units of measurement"
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
