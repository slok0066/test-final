import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';

export default function FuelCalculator() {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [unit, setUnit] = useState('km'); // km or miles
  const [result, setResult] = useState<number | null>(null);

  const calculateFuelCost = () => {
    const d = parseFloat(distance);
    const e = parseFloat(fuelEfficiency);
    const p = parseFloat(fuelPrice);

    if (isNaN(d) || isNaN(e) || isNaN(p)) {
      return;
    }

    // Convert miles to km if needed
    const distanceInKm = unit === 'miles' ? d * 1.60934 : d;
    const fuelNeeded = distanceInKm / e;
    const totalCost = fuelNeeded * p;

    setResult(totalCost);
  };

  return (
    <ToolLayout title="Fuel Cost Calculator" description="Calculate the fuel cost for your trip">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Distance</Label>
              <Input
                type="number"
                placeholder="Enter distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">Kilometers</SelectItem>
                  <SelectItem value="miles">Miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Fuel Efficiency (km/L)</Label>
            <Input
              type="number"
              placeholder="Enter fuel efficiency"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Fuel Price (per liter)</Label>
            <Input
              type="number"
              placeholder="Enter fuel price"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
            />
          </div>

          <Button onClick={calculateFuelCost} className="w-full">
            Calculate
          </Button>

          {result !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-center">
                Estimated Fuel Cost: <span className="font-bold">${result.toFixed(2)}</span>
              </p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
