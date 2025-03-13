import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';

export default function WindCalculator() {
  const [windSpeed, setWindSpeed] = useState('');
  const [fromUnit, setFromUnit] = useState('mph');
  const [toUnit, setToUnit] = useState('kph');
  const [result, setResult] = useState<number | null>(null);

  const conversionFactors = {
    mph: {
      kph: 1.60934,
      ms: 0.44704,
      knots: 0.868976
    },
    kph: {
      mph: 0.621371,
      ms: 0.277778,
      knots: 0.539957
    },
    ms: {
      mph: 2.23694,
      kph: 3.6,
      knots: 1.94384
    },
    knots: {
      mph: 1.15078,
      kph: 1.852,
      ms: 0.514444
    }
  };

  const unitNames = {
    mph: 'Miles per hour',
    kph: 'Kilometers per hour',
    ms: 'Meters per second',
    knots: 'Knots'
  };

  const convert = () => {
    const speed = parseFloat(windSpeed);
    if (isNaN(speed)) return;

    if (fromUnit === toUnit) {
      setResult(speed);
      return;
    }

    const factor = conversionFactors[fromUnit as keyof typeof conversionFactors][toUnit as keyof typeof conversionFactors[typeof fromUnit]];
    setResult(speed * factor);
  };

  const getBeaufortScale = (speedInKnots: number) => {
    if (speedInKnots < 1) return { force: 0, description: 'Calm' };
    if (speedInKnots < 4) return { force: 1, description: 'Light air' };
    if (speedInKnots < 7) return { force: 2, description: 'Light breeze' };
    if (speedInKnots < 11) return { force: 3, description: 'Gentle breeze' };
    if (speedInKnots < 17) return { force: 4, description: 'Moderate breeze' };
    if (speedInKnots < 22) return { force: 5, description: 'Fresh breeze' };
    if (speedInKnots < 28) return { force: 6, description: 'Strong breeze' };
    if (speedInKnots < 34) return { force: 7, description: 'Near gale' };
    if (speedInKnots < 41) return { force: 8, description: 'Gale' };
    if (speedInKnots < 48) return { force: 9, description: 'Strong gale' };
    if (speedInKnots < 56) return { force: 10, description: 'Storm' };
    if (speedInKnots < 64) return { force: 11, description: 'Violent storm' };
    return { force: 12, description: 'Hurricane force' };
  };

  const getBeaufortDescription = () => {
    if (!result) return null;
    
    // Convert to knots for Beaufort scale
    let speedInKnots = result;
    if (toUnit !== 'knots') {
      speedInKnots *= conversionFactors[toUnit as keyof typeof conversionFactors]['knots' as keyof typeof conversionFactors[typeof toUnit]];
    }
    
    return getBeaufortScale(speedInKnots);
  };

  return (
    <ToolLayout title="Wind Speed Calculator" description="Convert between wind speed units">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Wind Speed</Label>
              <Input
                type="number"
                placeholder="Enter wind speed"
                value={windSpeed}
                onChange={(e) => setWindSpeed(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>From Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitNames).map(([key, name]) => (
                    <SelectItem key={key} value={key}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To Unit</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitNames).map(([key, name]) => (
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
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg text-center">
                <p className="text-lg">
                  {windSpeed} {unitNames[fromUnit as keyof typeof unitNames]} = 
                  <span className="font-bold"> {result.toFixed(2)} {unitNames[toUnit as keyof typeof unitNames]}</span>
                </p>
              </div>

              {getBeaufortDescription() && (
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Beaufort Scale</h3>
                  <p>
                    Force {getBeaufortDescription()?.force}: {getBeaufortDescription()?.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
