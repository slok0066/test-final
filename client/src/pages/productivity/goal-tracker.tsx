import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Target, Calendar, CheckCircle2, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  progress: number;
  milestones: Milestone[];
  expanded: boolean;
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    category: '',
    dueDate: '',
    progress: 0,
    milestones: [],
    expanded: true
  });
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState('');
  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  const categories = [
    'Personal',
    'Professional',
    'Health',
    'Financial',
    'Educational',
    'Other'
  ];

  const addGoal = () => {
    if (!newGoal.title || !newGoal.category || !newGoal.dueDate) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title!,
      description: newGoal.description || '',
      category: newGoal.category!,
      dueDate: newGoal.dueDate!,
      progress: 0,
      milestones: [],
      expanded: true
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: '',
      dueDate: '',
      progress: 0,
      milestones: [],
      expanded: true
    });
    setShowNewGoalForm(false);
  };

  const addMilestone = (goalId: string) => {
    if (!newMilestone) return;

    const milestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestone,
      completed: false
    };

    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          milestones: [...goal.milestones, milestone]
        };
      }
      return goal;
    }));

    setNewMilestone('');
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });

        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = updatedMilestones.length > 0
          ? (completedCount / updatedMilestones.length) * 100
          : 0;

        return {
          ...goal,
          milestones: updatedMilestones,
          progress
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const toggleGoalExpansion = (goalId: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, expanded: !goal.expanded };
      }
      return goal;
    }));
  };

  return (
    <ToolLayout title="Goal Tracker" description="Track your goals and progress">
      <Card className="w-full max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Goals</h2>
            <Button
              onClick={() => setShowNewGoalForm(!showNewGoalForm)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </div>

          {showNewGoalForm && (
            <Card className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Enter goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter goal description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newGoal.category}
                    onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewGoalForm(false)}>
                  Cancel
                </Button>
                <Button onClick={addGoal}>
                  Create Goal
                </Button>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            {goals.map(goal => (
              <Card key={goal.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleGoalExpansion(goal.id)}
                        >
                          {goal.expanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )}
                        </Button>
                        <h3 className="text-lg font-semibold">{goal.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {goal.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(goal.dueDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Progress value={goal.progress} className="h-2" />

                  {goal.expanded && (
                    <>
                      <p className="text-sm text-muted-foreground">
                        {goal.description}
                      </p>

                      <div className="space-y-2">
                        <Label>Milestones</Label>
                        <div className="space-y-2">
                          {goal.milestones.map(milestone => (
                            <div
                              key={milestone.id}
                              className="flex items-center gap-2"
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleMilestone(goal.id, milestone.id)}
                              >
                                <CheckCircle2
                                  className={`h-4 w-4 ${
                                    milestone.completed
                                      ? 'text-primary'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              </Button>
                              <span className={milestone.completed ? 'line-through' : ''}>
                                {milestone.title}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a milestone"
                            value={newMilestone}
                            onChange={(e) => setNewMilestone(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addMilestone(goal.id);
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            onClick={() => addMilestone(goal.id)}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
} 