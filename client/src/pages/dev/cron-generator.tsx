import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function CronGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const presets = [
    { name: "Every Minute", value: "* * * * *" },
    { name: "Every Hour", value: "0 * * * *" },
    { name: "Every Day at Midnight", value: "0 0 * * *" },
    { name: "Every Sunday at Midnight", value: "0 0 * * 0" },
    { name: "Every Month on the 1st", value: "0 0 1 * *" },
  ];

  const applyPreset = (value: string) => {
    const [min, hr, dom, mon, dow] = value.split(" ");
    setMinute(min);
    setHour(hr);
    setDayOfMonth(dom);
    setMonth(mon);
    setDayOfWeek(dow);
  };

  return (
    <ToolLayout
      title="Cron Expression Generator"
      description="Generate and validate cron expressions for scheduled tasks"
    >
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium">Common Presets</h3>
            <div className="grid gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.value}
                  variant="outline"
                  className="justify-start"
                  onClick={() => applyPreset(preset.value)}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium">Custom Expression</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minute (0-59)</label>
                <Input
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  placeholder="*"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hour (0-23)</label>
                <Input
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="*"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Day of Month (1-31)</label>
                <Input
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                  placeholder="*"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Month (1-12)</label>
                <Input
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="*"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Day of Week (0-6)</label>
                <Input
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  placeholder="*"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-muted rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Generated Expression</h4>
              <p className="font-mono text-lg">{cronExpression}</p>
            </div>
            <Button
              onClick={() => navigator.clipboard.writeText(cronExpression)}
              variant="secondary"
            >
              Copy
            </Button>
          </div>
        </motion.div>
      </div>
    </ToolLayout>
  );
} 