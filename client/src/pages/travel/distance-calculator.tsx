import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';

export default function DistanceCalculator() {
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');
  const [lat2, setLat2] = useState('');
  const [lon2, setLon2] = useState('');
  const [unit, setUnit] = useState('km');
  const [distance, setDistance] = useState<number | null>(null);

  const calculateDistance = () => {
    const φ1 = parseFloat(lat1) * Math.PI/180;
    const φ2 = parseFloat(lat2) * Math.PI/180;
    const Δφ = (parseFloat(lat2) - parseFloat(lat1)) * Math.PI/180;
    const Δλ = (parseFloat(lon2) - parseFloat(lon1)) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    // Earth's radius in kilometers
    const R = 6371;
    
    let d = R * c;
    
    // Convert to miles if needed
    if (unit === 'miles') {
      d *= 0.621371;
    }
    
    setDistance(d);
  };

  return (
    <ToolLayout title="Distance Calculator" description="Calculate distance between coordinates">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium">Location 1</h3>
              <div className="space-y-2">
                <Label>Latitude</Label>
                <Input
                  type="number"
                  placeholder="Enter latitude"
                  value={lat1}
                  onChange={(e) => setLat1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Longitude</Label>
                <Input
                  type="number"
                  placeholder="Enter longitude"
                  value={lon1}
                  onChange={(e) => setLon1(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Location 2</h3>
              <div className="space-y-2">
                <Label>Latitude</Label>
                <Input
                  type="number"
                  placeholder="Enter latitude"
                  value={lat2}
                  onChange={(e) => setLat2(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Longitude</Label>
                <Input
                  type="number"
                  placeholder="Enter longitude"
                  value={lon2}
                  onChange={(e) => setLon2(e.target.value)}
                />
              </div>
            </div>
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

          <Button onClick={calculateDistance} className="w-full">
            Calculate Distance
          </Button>

          {distance !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-lg text-center">
              <p className="text-lg">
                Distance: <span className="font-bold">
                  {distance.toFixed(2)} {unit}
                </span>
              </p>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Enter the latitude and longitude of the first location</li>
              <li>Enter the latitude and longitude of the second location</li>
              <li>Select your preferred unit (kilometers or miles)</li>
              <li>Click "Calculate Distance" to see the result</li>
            </ol>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
