import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Droplet } from "lucide-react";

interface WaterEntry {
  id: string;
  amount: number;
  time: string;
}

export default function WaterTracker() {
  const [entries, setEntries] = React.useState<WaterEntry[]>([]);
  const [customAmount, setCustomAmount] = React.useState("");
  const [dailyGoal, setDailyGoal] = React.useState("2000"); // in ml

  const addWater = (amount: number) => {
    const newEntry: WaterEntry = {
      id: Date.now().toString(),
      amount,
      time: new Date().toLocaleTimeString(),
    };
    setEntries([...entries, newEntry]);
  };

  const addCustomAmount = () => {
    if (!customAmount) return;
    addWater(parseInt(customAmount));
    setCustomAmount("");
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const totalWater = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const progress = Math.min((totalWater / parseInt(dailyGoal)) * 100, 100);

  const quickAddButtons = [
    { amount: 250, label: "Cup (250ml)" },
    { amount: 500, label: "Bottle (500ml)" },
    { amount: 1000, label: "Large Bottle (1L)" },
  ];

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Water Intake Tracker</h1>

        <div className="space-y-6">
          <div>
            <Label>Daily Water Goal (ml)</Label>
            <Input
              type="number"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              placeholder="Enter daily water goal in ml"
            />
          </div>

          <div className="space-y-2">
            <Label>Progress</Label>
            <Progress value={progress} className="h-4" />
            <p className="text-sm text-muted-foreground text-center">
              {totalWater}ml / {dailyGoal}ml ({Math.round(progress)}%)
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {quickAddButtons.map((btn) => (
              <Button
                key={btn.amount}
                onClick={() => addWater(btn.amount)}
                variant="outline"
                className="h-auto py-4"
              >
                <div className="text-center">
                  <Droplet className="h-4 w-4 mx-auto mb-1" />
                  <div className="text-sm">{btn.label}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Custom amount (ml)"
            />
            <Button onClick={addCustomAmount}>Add</Button>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Today's Entries</h2>
            <div className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between bg-secondary p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4" />
                    <span>{entry.amount}ml</span>
                    <span className="text-sm text-muted-foreground">
                      at {entry.time}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry(entry.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {totalWater >= parseInt(dailyGoal) && (
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
              🎉 Congratulations! You've reached your daily water goal!
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
