import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ToolLayout } from '@/components/tool-layout';

export default function RainProbability() {
  const [humidity, setHumidity] = useState('');
  const [cloudCover, setCloudCover] = useState('');
  const [pressure, setPressure] = useState('');
  const [probability, setProbability] = useState<number | null>(null);

  const calculateProbability = () => {
    const h = parseFloat(humidity);
    const c = parseFloat(cloudCover);
    const p = parseFloat(pressure);

    if (isNaN(h) || isNaN(c) || isNaN(p)) return;

    // Simple algorithm for demonstration
    // In reality, this would be much more complex and consider many more factors
    let prob = 0;

    // Humidity factor (0-40%)
    prob += (h / 100) * 40;

    // Cloud cover factor (0-40%)
    prob += (c / 100) * 40;

    // Pressure factor (0-20%)
    // Standard pressure is around 1013.25 hPa
    const pressureFactor = (1013.25 - p) / 10;
    prob += Math.min(Math.max(pressureFactor, 0), 20);

    setProbability(Math.min(Math.max(prob, 0), 100));
  };

  const getRiskLevel = (prob: number) => {
    if (prob < 30) return { level: 'Low', color: 'text-green-500' };
    if (prob < 60) return { level: 'Moderate', color: 'text-yellow-500' };
    return { level: 'High', color: 'text-red-500' };
  };

  return (
    <ToolLayout title="Rain Probability Calculator" description="Calculate the probability of rain">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Relative Humidity (%)</Label>
              <Input
                type="number"
                placeholder="Enter humidity (0-100)"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label>Cloud Cover (%)</Label>
              <Input
                type="number"
                placeholder="Enter cloud cover (0-100)"
                value={cloudCover}
                onChange={(e) => setCloudCover(e.target.value)}
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label>Atmospheric Pressure (hPa)</Label>
              <Input
                type="number"
                placeholder="Enter pressure (e.g., 1013.25)"
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateProbability} className="w-full">
            Calculate Probability
          </Button>

          {probability !== null && (
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Rain Probability</h3>
                    <span className={getRiskLevel(probability).color}>
                      {getRiskLevel(probability).level} Risk
                    </span>
                  </div>
                  <Progress value={probability} className="h-2" />
                  <p className="text-center text-lg font-bold">{probability.toFixed(1)}%</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Factors considered:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Relative Humidity: Higher humidity increases rain probability</li>
                  <li>Cloud Cover: More clouds indicate higher chance of rain</li>
                  <li>Atmospheric Pressure: Lower pressure often indicates incoming precipitation</li>
                </ul>
                <p className="text-xs italic mt-2">
                  Note: This is a simplified calculation. Actual rain probability depends on many more factors
                  including temperature, wind patterns, and seasonal variations.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
