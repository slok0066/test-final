import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from '@/components/tool-layout';

export default function WeatherConverter() {
  const [temperature, setTemperature] = useState('');
  const [convertedTemp, setConvertedTemp] = useState<{ celsius: string; fahrenheit: string; kelvin: string }>({
    celsius: '',
    fahrenheit: '',
    kelvin: ''
  });

  const convertTemperature = (value: string, from: string) => {
    const temp = parseFloat(value);
    if (isNaN(temp)) return;

    let celsius = 0;
    let fahrenheit = 0;
    let kelvin = 0;

    switch (from) {
      case 'celsius':
        celsius = temp;
        fahrenheit = (temp * 9/5) + 32;
        kelvin = temp + 273.15;
        break;
      case 'fahrenheit':
        celsius = (temp - 32) * 5/9;
        fahrenheit = temp;
        kelvin = (temp - 32) * 5/9 + 273.15;
        break;
      case 'kelvin':
        celsius = temp - 273.15;
        fahrenheit = (temp - 273.15) * 9/5 + 32;
        kelvin = temp;
        break;
    }

    setConvertedTemp({
      celsius: celsius.toFixed(2),
      fahrenheit: fahrenheit.toFixed(2),
      kelvin: kelvin.toFixed(2)
    });
  };

  return (
    <ToolLayout title="Weather Unit Converter" description="Convert between different weather units">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <Tabs defaultValue="temperature" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="wind" disabled>Wind Speed (Coming Soon)</TabsTrigger>
          </TabsList>

          <TabsContent value="temperature" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Celsius</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="°C"
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(e.target.value);
                      convertTemperature(e.target.value, 'celsius');
                    }}
                  />
                </div>
                {convertedTemp.celsius && (
                  <p className="text-sm text-muted-foreground">{convertedTemp.celsius}°C</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Fahrenheit</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="°F"
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(e.target.value);
                      convertTemperature(e.target.value, 'fahrenheit');
                    }}
                  />
                </div>
                {convertedTemp.fahrenheit && (
                  <p className="text-sm text-muted-foreground">{convertedTemp.fahrenheit}°F</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Kelvin</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="K"
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(e.target.value);
                      convertTemperature(e.target.value, 'kelvin');
                    }}
                  />
                </div>
                {convertedTemp.kelvin && (
                  <p className="text-sm text-muted-foreground">{convertedTemp.kelvin}K</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </ToolLayout>
  );
}
