import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BudgetItem {
  id: string;
  category: string;
  planned: number;
  actual: number;
}

const defaultCategories = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Insurance",
  "Healthcare",
  "Savings",
  "Entertainment",
  "Shopping",
  "Other",
];

export default function BudgetPlanner() {
  const [income, setIncome] = React.useState("");
  const [budgetItems, setBudgetItems] = React.useState<BudgetItem[]>(() =>
    defaultCategories.map((category) => ({
      id: category.toLowerCase(),
      category,
      planned: 0,
      actual: 0,
    }))
  );

  const updatePlanned = (id: string, value: number) => {
    setBudgetItems(
      budgetItems.map((item) =>
        item.id === id ? { ...item, planned: value } : item
      )
    );
  };

  const updateActual = (id: string, value: number) => {
    setBudgetItems(
      budgetItems.map((item) =>
        item.id === id ? { ...item, actual: value } : item
      )
    );
  };

  const totalPlanned = budgetItems.reduce((sum, item) => sum + item.planned, 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + item.actual, 0);
  const remainingIncome = income ? parseFloat(income) - totalPlanned : 0;
  const remainingBudget = income ? parseFloat(income) - totalActual : 0;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Budget Planner</h1>

        <div className="space-y-6">
          <div>
            <Label>Monthly Income</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your monthly income"
            />
          </div>

          {income && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-secondary">
                <h3 className="font-medium mb-2">Planned Budget</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Planned:</span>
                    <span>${totalPlanned.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className={remainingIncome < 0 ? "text-red-500" : ""}>
                      ${remainingIncome.toFixed(2)}
                    </span>
                  </div>
                  <Progress
                    value={(totalPlanned / parseFloat(income)) * 100}
                    className="h-2"
                  />
                </div>
              </Card>

              <Card className="p-4 bg-secondary">
                <h3 className="font-medium mb-2">Actual Spending</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Spent:</span>
                    <span>${totalActual.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className={remainingBudget < 0 ? "text-red-500" : ""}>
                      ${remainingBudget.toFixed(2)}
                    </span>
                  </div>
                  <Progress
                    value={(totalActual / parseFloat(income)) * 100}
                    className="h-2"
                  />
                </div>
              </Card>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Planned Budget</TableHead>
                  <TableHead>Actual Spending</TableHead>
                  <TableHead>Difference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.planned || ""}
                        onChange={(e) =>
                          updatePlanned(item.id, parseFloat(e.target.value) || 0)
                        }
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.actual || ""}
                        onChange={(e) =>
                          updateActual(item.id, parseFloat(e.target.value) || 0)
                        }
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell
                      className={
                        item.planned - item.actual < 0 ? "text-red-500" : "text-green-500"
                      }
                    >
                      ${(item.planned - item.actual).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {income && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Budget Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgetItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <h3 className="font-medium mb-2">{item.category}</h3>
                    <Progress
                      value={(item.actual / item.planned) * 100}
                      className="h-2 mb-2"
                    />
                    <div className="text-sm text-muted-foreground">
                      ${item.actual.toFixed(2)} of ${item.planned.toFixed(2)}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
