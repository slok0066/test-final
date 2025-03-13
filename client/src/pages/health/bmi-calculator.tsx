import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BMICalculator() {
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [unit, setUnit] = React.useState("metric"); // metric or imperial
  const [bmi, setBMI] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;

    let bmiValue: number;
    if (unit === "metric") {
      // Height in meters, weight in kg
      const heightInM = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInM * heightInM);
    } else {
      // Height in inches, weight in pounds
      bmiValue = (parseFloat(weight) * 703) / (parseFloat(height) * parseFloat(height));
    }

    setBMI(Math.round(bmiValue * 10) / 10);

    // Set BMI category
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue < 25) {
      setCategory("Normal weight");
    } else if (bmiValue < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">BMI Calculator</h1>
        
        <div className="space-y-4">
          <div className="mb-4">
            <Label>Unit System</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (cm/kg)</SelectItem>
                <SelectItem value="imperial">Imperial (in/lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label>Height {unit === "metric" ? "(cm)" : "(inches)"}</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === "metric" ? "centimeters" : "inches"}`}
            />
          </div>

          <div className="mb-4">
            <Label>Weight {unit === "metric" ? "(kg)" : "(lbs)"}</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === "metric" ? "kilograms" : "pounds"}`}
            />
          </div>

          <Button onClick={calculateBMI} className="w-full">
            Calculate BMI
          </Button>

          {bmi !== null && (
            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Your Results</h2>
              <p className="mb-2">BMI: {bmi}</p>
              <p className="font-medium">Category: {category}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Note: BMI is a general indicator and may not be accurate for athletes, 
                pregnant women, or the elderly. Consult a healthcare provider for 
                proper evaluation.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
