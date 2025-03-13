import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ToolLayout } from '@/components/tool-layout';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Plus, Trash2, Check, X } from 'lucide-react';

interface Habit {
  id: number;
  name: string;
  category: string;
  frequency: string;
  completedDates: string[];
  notes?: string;
}

const categories = [
  'Health',
  'Fitness',
  'Productivity',
  'Learning',
  'Mindfulness',
  'Other'
];

const frequencies = [
  'Daily',
  'Weekdays',
  'Weekends',
  'Weekly',
  'Custom'
];

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newHabit, setNewHabit] = useState({
    name: '',
    category: 'Health',
    frequency: 'Daily',
    notes: ''
  });

  const addHabit = () => {
    if (!newHabit.name) return;

    const habit: Habit = {
      id: Date.now(),
      name: newHabit.name,
      category: newHabit.category,
      frequency: newHabit.frequency,
      completedDates: [],
      notes: newHabit.notes
    };

    setHabits([...habits, habit]);
    setNewHabit({
      name: '',
      category: 'Health',
      frequency: 'Daily',
      notes: ''
    });
  };

  const removeHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const toggleHabitCompletion = (habitId: number, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completedDates = habit.completedDates.includes(date)
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date];
        return { ...habit, completedDates };
      }
      return habit;
    }));
  };

  const getMonthDates = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    return eachDayOfInterval({ start, end });
  };

  const isHabitCompleted = (habit: Habit, date: string) => {
    return habit.completedDates.includes(date);
  };

  return (
    <ToolLayout title="Habit Tracker" description="Track your daily habits">
      <Card className="w-full max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Habit Name</Label>
              <Input
                placeholder="Enter habit name"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newHabit.category}
                onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select
                value={newHabit.frequency}
                onValueChange={(value) => setNewHabit({ ...newHabit, frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map(frequency => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Input
              placeholder="Additional notes"
              value={newHabit.notes}
              onChange={(e) => setNewHabit({ ...newHabit, notes: e.target.value })}
            />
          </div>

          <Button onClick={addHabit} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Habit
          </Button>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Habit Tracking for {format(selectedDate, 'MMMM yyyy')}</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left">Habit</th>
                    {getMonthDates().map(date => (
                      <th key={date.toString()} className="p-2 text-center w-10">
                        {format(date, 'd')}
                      </th>
                    ))}
                    <th className="p-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {habits.map(habit => (
                    <tr key={habit.id} className="border-t">
                      <td className="p-2">
                        <div>
                          <p className="font-medium">{habit.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {habit.category} • {habit.frequency}
                          </p>
                        </div>
                      </td>
                      {getMonthDates().map(date => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        const completed = isHabitCompleted(habit, dateStr);
                        return (
                          <td key={dateStr} className="p-2 text-center">
                            <Button
                              variant={completed ? "default" : "outline"}
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => toggleHabitCompletion(habit.id, dateStr)}
                            >
                              {completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <div className="w-4 h-4" />
                              )}
                            </Button>
                          </td>
                        );
                      })}
                      <td className="p-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeHabit(habit.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {habits.length === 0 && (
              <p className="text-center text-muted-foreground">
                No habits added yet. Add a habit to start tracking!
              </p>
            )}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
} 