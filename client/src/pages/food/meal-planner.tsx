import React, { useState } from 'react';
import { RouteComponentProps } from 'wouter';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToolLayout } from '@/components/tool-layout';
import { Plus, Trash2 } from 'lucide-react';

interface Meal {
  id: number;
  name: string;
  type: string;
  ingredients: string;
  calories: number;
  dayOfWeek: string;
  notes?: string;
}

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const mealTypes = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack'
];

const MealPlanner: React.FC<RouteComponentProps> = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    type: 'Breakfast',
    ingredients: '',
    calories: '',
    notes: ''
  });

  const addMeal = () => {
    if (!newMeal.name || !newMeal.ingredients) return;

    const meal: Meal = {
      id: Date.now(),
      name: newMeal.name,
      type: newMeal.type,
      ingredients: newMeal.ingredients,
      calories: Number(newMeal.calories),
      dayOfWeek: selectedDay,
      notes: newMeal.notes
    };

    setMeals([...meals, meal]);
    setNewMeal({
      name: '',
      type: 'Breakfast',
      ingredients: '',
      calories: '',
      notes: ''
    });
  };

  const removeMeal = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const getMealsByDay = (day: string) => {
    return meals
      .filter(meal => meal.dayOfWeek === day)
      .sort((a, b) => {
        const typeOrder = { 'Breakfast': 0, 'Lunch': 1, 'Dinner': 2, 'Snack': 3 };
        return typeOrder[a.type as keyof typeof typeOrder] - typeOrder[b.type as keyof typeof typeOrder];
      });
  };

  return (
    <ToolLayout title="Meal Planner" description="Plan your weekly meals">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Select Day</Label>
            <Select
              value={selectedDay}
              onValueChange={setSelectedDay}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map(day => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Meal Name</Label>
              <Input
                placeholder="Enter meal name"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Meal Type</Label>
              <Select
                value={newMeal.type}
                onValueChange={(value) => setNewMeal({ ...newMeal, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ingredients</Label>
            <Textarea
              placeholder="Enter ingredients (one per line)"
              value={newMeal.ingredients}
              onChange={(e) => setNewMeal({ ...newMeal, ingredients: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Calories (optional)</Label>
              <Input
                type="number"
                placeholder="Estimated calories"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Input
                placeholder="Additional notes"
                value={newMeal.notes}
                onChange={(e) => setNewMeal({ ...newMeal, notes: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addMeal} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Meal
          </Button>

          <div className="space-y-4">
            <h3 className="font-semibold">Meals for {selectedDay}</h3>
            {getMealsByDay(selectedDay).map(meal => (
              <Card key={meal.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{meal.name}</p>
                      <span className="text-sm text-muted-foreground">({meal.type})</span>
                    </div>
                    <p className="text-sm whitespace-pre-line">{meal.ingredients}</p>
                    {meal.calories > 0 && (
                      <p className="text-sm text-muted-foreground">{meal.calories} calories</p>
                    )}
                    {meal.notes && (
                      <p className="text-sm text-muted-foreground">{meal.notes}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMeal(meal.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}

            {getMealsByDay(selectedDay).length === 0 && (
              <p className="text-center text-muted-foreground">
                No meals planned for {selectedDay}
              </p>
            )}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default MealPlanner;
