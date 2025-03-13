import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland"
];

export default function TimezoneConverter() {
  const [sourceTime, setSourceTime] = React.useState("");
  const [sourceZone, setSourceZone] = React.useState("UTC");
  const [targetZone, setTargetZone] = React.useState("America/New_York");
  const [result, setResult] = React.useState("");

  const handleConvert = () => {
    try {
      // In a real app, this would use a proper date library like date-fns-tz
      // This is just a placeholder implementation
      const date = new Date(sourceTime);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      setResult(date.toLocaleString());
    } catch (error) {
      setResult("Invalid date format");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Timezone Converter</h1>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Source Time
            </label>
            <Input
              type="datetime-local"
              value={sourceTime}
              onChange={(e) => setSourceTime(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                From Timezone
              </label>
              <Select value={sourceZone} onValueChange={setSourceZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                To Timezone
              </label>
              <Select value={targetZone} onValueChange={setTargetZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleConvert} className="w-full">
            Convert
          </Button>

          {result && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Converted Time
              </label>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-center font-medium">{result}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
