import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DateCalculator() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [result, setResult] = React.useState("");
  const [addValue, setAddValue] = React.useState("");
  const [addUnit, setAddUnit] = React.useState("days");
  const [addResult, setAddResult] = React.useState("");

  const calculateDifference = () => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setResult(`${diffDays} days`);
    } catch (error) {
      setResult("Invalid date format");
    }
  };

  const addToDate = () => {
    try {
      const start = new Date(startDate);
      const value = parseInt(addValue);
      let result = new Date(start);

      switch (addUnit) {
        case "days":
          result.setDate(start.getDate() + value);
          break;
        case "months":
          result.setMonth(start.getMonth() + value);
          break;
        case "years":
          result.setFullYear(start.getFullYear() + value);
          break;
      }

      setAddResult(result.toLocaleDateString());
    } catch (error) {
      setAddResult("Invalid input");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Date Calculator</h1>
      <Tabs defaultValue="difference">
        <TabsList>
          <TabsTrigger value="difference">Date Difference</TabsTrigger>
          <TabsTrigger value="add">Add/Subtract</TabsTrigger>
        </TabsList>

        <TabsContent value="difference">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <Button onClick={calculateDifference} className="w-full">
                Calculate Difference
              </Button>

              {result && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-center font-medium">{result}</p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Value
                  </label>
                  <Input
                    type="number"
                    value={addValue}
                    onChange={(e) => setAddValue(e.target.value)}
                    placeholder="Enter number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Unit
                  </label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={addUnit}
                    onChange={(e) => setAddUnit(e.target.value)}
                  >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>

              <Button onClick={addToDate} className="w-full">
                Calculate
              </Button>

              {addResult && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-center font-medium">{addResult}</p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
