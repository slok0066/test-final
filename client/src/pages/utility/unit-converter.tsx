import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const conversions = {
  length: {
    name: "Length",
    units: ["meters", "kilometers", "miles", "feet", "inches", "centimeters"],
    conversions: {
      meters: {
        meters: 1,
        kilometers: 0.001,
        miles: 0.000621371,
        feet: 3.28084,
        inches: 39.3701,
        centimeters: 100,
      },
    },
  },
  weight: {
    name: "Weight",
    units: ["kilograms", "grams", "pounds", "ounces"],
    conversions: {
      kilograms: {
        kilograms: 1,
        grams: 1000,
        pounds: 2.20462,
        ounces: 35.274,
      },
    },
  },
  temperature: {
    name: "Temperature",
    units: ["celsius", "fahrenheit", "kelvin"],
    special: true,
  },
  volume: {
    name: "Volume",
    units: ["liters", "milliliters", "gallons", "cups"],
    conversions: {
      liters: {
        liters: 1,
        milliliters: 1000,
        gallons: 0.264172,
        cups: 4.22675,
      },
    },
  },
  area: {
    name: "Area",
    units: ["square meters", "square feet", "square inches", "acres"],
    conversions: {
      "square meters": {
        "square meters": 1,
        "square feet": 10.7639,
        "square inches": 1550,
        acres: 0.000247105,
      },
    },
  },
};

const convertTemperature = (value: number, from: string, to: string) => {
  let celsius = value;
  if (from === "fahrenheit") {
    celsius = (value - 32) * (5 / 9);
  } else if (from === "kelvin") {
    celsius = value - 273.15;
  }

  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return celsius * (9 / 5) + 32;
  if (to === "kelvin") return celsius + 273.15;
  return value;
};

const convert = (
  value: number,
  from: string,
  to: string,
  category: keyof typeof conversions
) => {
  if (category === "temperature") {
    return convertTemperature(value, from, to);
  }

  const conversionData = conversions[category].conversions;
  const baseUnit = Object.keys(conversionData)[0];
  
  // Convert to base unit first
  let baseValue = value;
  if (from !== baseUnit) {
    baseValue = value / conversionData[baseUnit][from];
  }
  
  // Convert from base unit to target unit
  return baseValue * conversionData[baseUnit][to];
};

export default function UnitConverter() {
  const [category, setCategory] = React.useState<keyof typeof conversions>("length");
  const [fromUnit, setFromUnit] = React.useState("");
  const [toUnit, setToUnit] = React.useState("");
  const [fromValue, setFromValue] = React.useState("");
  const [toValue, setToValue] = React.useState("");

  React.useEffect(() => {
    setFromUnit(conversions[category].units[0]);
    setToUnit(conversions[category].units[1]);
  }, [category]);

  const handleConversion = (value: string, direction: "from" | "to") => {
    if (!value) {
      setFromValue("");
      setToValue("");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    if (direction === "from") {
      setFromValue(value);
      const result = convert(numValue, fromUnit, toUnit, category);
      setToValue(result.toFixed(6));
    } else {
      setToValue(value);
      const result = convert(numValue, toUnit, fromUnit, category);
      setFromValue(result.toFixed(6));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Unit Converter</h1>

        <div className="space-y-4">
          <div>
            <Select
              value={category}
              onValueChange={(value: keyof typeof conversions) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversions).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="From unit" />
                </SelectTrigger>
                <SelectContent>
                  {conversions[category].units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={fromValue}
                onChange={(e) => handleConversion(e.target.value, "from")}
                placeholder="Enter value"
              />
            </div>

            <div className="space-y-2">
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="To unit" />
                </SelectTrigger>
                <SelectContent>
                  {conversions[category].units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={toValue}
                onChange={(e) => handleConversion(e.target.value, "to")}
                placeholder="Result"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
