import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  time: string;
}

export default function CalorieCounter() {
  const [entries, setEntries] = React.useState<FoodEntry[]>([]);
  const [foodName, setFoodName] = React.useState("");
  const [calories, setCalories] = React.useState("");
  const [dailyGoal, setDailyGoal] = React.useState("2000");

  const addEntry = () => {
    if (!foodName || !calories) return;
    
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name: foodName,
      calories: parseInt(calories),
      time: new Date().toLocaleTimeString(),
    };

    setEntries([...entries, newEntry]);
    setFoodName("");
    setCalories("");
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const remainingCalories = parseInt(dailyGoal) - totalCalories;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Calorie Counter</h1>

        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Daily Calorie Goal</Label>
              <Input
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                placeholder="Enter daily calorie goal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Food Name</Label>
              <Input
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Enter food name"
              />
            </div>
            <div>
              <Label>Calories</Label>
              <Input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter calories"
              />
            </div>
          </div>

          <Button onClick={addEntry} className="w-full">
            Add Food Entry
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <Card className="p-4 bg-secondary">
            <h3 className="font-medium mb-1">Total Calories</h3>
            <p className="text-2xl font-bold">{totalCalories}</p>
          </Card>
          <Card className="p-4 bg-secondary">
            <h3 className="font-medium mb-1">Remaining</h3>
            <p className={`text-2xl font-bold ${remainingCalories < 0 ? 'text-red-500' : ''}`}>
              {remainingCalories}
            </p>
          </Card>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Food</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.time}</TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.calories}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(entry.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
