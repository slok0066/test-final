import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';

type UnitType = 'cup' | 'ml' | 'tbsp' | 'tsp' | 'liter' | 'floz';

interface ConversionFactors {
  [key in UnitType]: {
    [key in UnitType]: number;
  };
}

interface UnitNames {
  [key in UnitType]: string;
}

export default function RecipeConverter() {
  const [amount, setAmount] = useState('');
  const [fromUnit, setFromUnit] = useState<UnitType>('cup');
  const [toUnit, setToUnit] = useState<UnitType>('ml');
  const [result, setResult] = useState<number | null>(null);

  const conversionFactors: ConversionFactors = {
    cup: {
      cup: 1,
      ml: 236.588,
      tbsp: 16,
      tsp: 48,
      liter: 0.236588,
      floz: 8
    },
    ml: {
      cup: 0.00422675,
      ml: 1,
      tbsp: 0.067628,
      tsp: 0.202884,
      liter: 0.001,
      floz: 0.033814
    },
    tbsp: {
      cup: 0.0625,
      ml: 14.7868,
      tbsp: 1,
      tsp: 3,
      liter: 0.0147868,
      floz: 0.5
    },
    tsp: {
      cup: 0.0208333,
      ml: 4.92892,
      tbsp: 0.333333,
      tsp: 1,
      liter: 0.00492892,
      floz: 0.166667
    },
    liter: {
      cup: 4.22675,
      ml: 1000,
      tbsp: 67.628,
      tsp: 202.884,
      liter: 1,
      floz: 33.814
    },
    floz: {
      cup: 0.125,
      ml: 29.5735,
      tbsp: 2,
      tsp: 6,
      liter: 0.0295735,
      floz: 1
    }
  };

  const unitNames: UnitNames = {
    cup: 'Cups',
    ml: 'Milliliters',
    tbsp: 'Tablespoons',
    tsp: 'Teaspoons',
    liter: 'Liters',
    floz: 'Fluid Ounces'
  };

  const convert = () => {
    const value = parseFloat(amount);
    if (isNaN(value)) return;

    if (fromUnit === toUnit) {
      setResult(value);
      return;
    }

    const factor = conversionFactors[fromUnit][toUnit];
    setResult(value * factor);
  };

  return (
    <ToolLayout title="Recipe Converter" description="Convert between recipe measurements">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>From Unit</Label>
              <Select value={fromUnit} onValueChange={(value: UnitType) => setFromUnit(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(unitNames) as [UnitType, string][]).map(([key, name]) => (
                    <SelectItem key={key} value={key}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To Unit</Label>
              <Select value={toUnit} onValueChange={(value: UnitType) => setToUnit(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(unitNames) as [UnitType, string][]).map(([key, name]) => (
                    <SelectItem key={key} value={key}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={convert} className="w-full">
            Convert
          </Button>

          {result !== null && (
            <div className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-lg">
                {amount} {unitNames[fromUnit]} = 
                <span className="font-bold"> {result.toFixed(2)} {unitNames[toUnit]}</span>
              </p>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <h3 className="font-semibold mb-2">Common Equivalents:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>1 cup = 16 tablespoons = 48 teaspoons = 236.59 ml</li>
              <li>1 tablespoon = 3 teaspoons = 14.79 ml</li>
              <li>1 cup = 8 fluid ounces = 0.237 liters</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
