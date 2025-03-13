import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

const TIMEZONES = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
];

export default function TimeConverter() {
  const [fromTz, setFromTz] = useState("UTC");
  const [toTz, setToTz] = useState("America/New_York");
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      if (!time) {
        throw new Error("Please enter a valid time");
      }

      const date = new Date();
      const [hours, minutes] = time.split(":");
      date.setHours(parseInt(hours), parseInt(minutes));

      const fromTime = new Date(date.toLocaleString("en-US", { timeZone: fromTz }));
      const toTime = new Date(date.toLocaleString("en-US", { timeZone: toTz }));
      const diff = toTime.getTime() - fromTime.getTime();
      
      const resultDate = new Date(date.getTime() + diff);
      setResult(resultDate.toLocaleTimeString());

      toast({
        title: "Conversion complete",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Time Zone Converter"
      description="Convert time between different time zones"
    >
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From Time Zone</Label>
                <Select value={fromTz} onValueChange={setFromTz}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>To Time Zone</Label>
                <Select value={toTz} onValueChange={setToTz}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Time (24-hour format)</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <Button onClick={convert} className="w-full">
              Convert Time
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-muted rounded-lg"
              >
                <Label>Converted Time:</Label>
                <p className="font-mono text-lg mt-1">{result}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
