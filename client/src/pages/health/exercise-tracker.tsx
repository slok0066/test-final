import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Plus, Trash2 } from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  date: Date;
  category: string;
  notes?: string;
}

const categories = [
  { value: 'strength', label: 'Strength Training' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' }
];

export default function ExerciseTracker() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    category: 'strength',
    notes: ''
  });

  const addExercise = () => {
    if (!newExercise.name || !newExercise.sets || !newExercise.reps) return;

    const exercise: Exercise = {
      id: Date.now(),
      name: newExercise.name,
      sets: Number(newExercise.sets),
      reps: Number(newExercise.reps),
      weight: Number(newExercise.weight),
      date: selectedDate,
      category: newExercise.category,
      notes: newExercise.notes
    };

    setExercises([...exercises, exercise]);
    setNewExercise({
      name: '',
      sets: '',
      reps: '',
      weight: '',
      category: 'strength',
      notes: ''
    });
  };

  const removeExercise = (id: number) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const getExercisesByDate = (date: Date) => {
    return exercises.filter(exercise => 
      format(exercise.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <ToolLayout title="Exercise Tracker" description="Track your workouts and exercises">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Exercise Name</Label>
              <Input
                placeholder="Enter exercise name"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newExercise.category}
                onValueChange={(value) => setNewExercise({ ...newExercise, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Sets</Label>
              <Input
                type="number"
                placeholder="Number of sets"
                value={newExercise.sets}
                onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Reps</Label>
              <Input
                type="number"
                placeholder="Reps per set"
                value={newExercise.reps}
                onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                placeholder="Weight (optional)"
                value={newExercise.weight}
                onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Input
              placeholder="Additional notes"
              value={newExercise.notes}
              onChange={(e) => setNewExercise({ ...newExercise, notes: e.target.value })}
            />
          </div>

          <Button onClick={addExercise} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>

          <div className="space-y-4">
            <h3 className="font-semibold">Exercises for {format(selectedDate, 'MMMM d, yyyy')}</h3>
            {getExercisesByDate(selectedDate).map(exercise => (
              <Card key={exercise.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{exercise.name}</p>
                      <span className="text-sm text-muted-foreground">
                        ({categories.find(c => c.value === exercise.category)?.label})
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} sets × {exercise.reps} reps
                      {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                    </p>
                    {exercise.notes && (
                      <p className="text-sm text-muted-foreground">{exercise.notes}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(exercise.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}

            {getExercisesByDate(selectedDate).length === 0 && (
              <p className="text-center text-muted-foreground">
                No exercises recorded for this date
              </p>
            )}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
} 