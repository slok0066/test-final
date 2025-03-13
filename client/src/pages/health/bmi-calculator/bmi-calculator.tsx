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
import ToolLayout from "@/components/tool-layout";

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
    <ToolLayout title="BMI Calculator" description="Calculate your Body Mass Index">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Unit System</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (cm/kg)</SelectItem>
                <SelectItem value="imperial">Imperial (in/lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                type="number"
                placeholder={`Enter height in ${unit === "metric" ? "cm" : "inches"}`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
              <Input
                type="number"
                placeholder={`Enter weight in ${unit === "metric" ? "kg" : "lbs"}`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateBMI} className="w-full">
            Calculate BMI
          </Button>

          {bmi !== null && (
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold">{bmi}</p>
                <p className={`text-lg font-medium ${
                  category === "Normal weight" 
                    ? "text-green-500" 
                    : category === "Underweight" 
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}>
                  {category}
                </p>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="font-medium">BMI Categories:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Underweight: &lt; 18.5</li>
                  <li>Normal weight: 18.5 - 24.9</li>
                  <li>Overweight: 25 - 29.9</li>
                  <li>Obese: ≥ 30</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
