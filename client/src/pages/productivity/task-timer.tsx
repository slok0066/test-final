import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Play, Pause, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  timeSpent: number;
  isRunning: boolean;
}

const TaskTimer: React.FC<RouteComponentProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks =>
        prevTasks.map(task => {
          if (task.isRunning) {
            return { ...task, timeSpent: task.timeSpent + 1 };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (!newTaskName) return;

    const task: Task = {
      id: Date.now(),
      name: newTaskName,
      timeSpent: 0,
      isRunning: false
    };

    setTasks([...tasks, task]);
    setNewTaskName('');
  };

  const toggleTimer = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isRunning: !task.isRunning } : task
    ));
  };

  const resetTimer = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, timeSpent: 0, isRunning: false } : task
    ));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalTime = () => {
    return tasks.reduce((total, task) => total + task.timeSpent, 0);
  };

  return (
    <ToolLayout title="Task Timer" description="Track time spent on tasks">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Enter task name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
            </div>
            <Button onClick={addTask}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {tasks.map(task => (
            <Card key={task.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{task.name}</h3>
                  <p className="text-2xl font-mono">
                    {formatTime(task.timeSpent)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={task.isRunning ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleTimer(task.id)}
                  >
                    {task.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resetTimer(task.id)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {tasks.length > 0 && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Time</p>
              <p className="text-2xl font-mono font-bold">
                {formatTime(getTotalTime())}
              </p>
            </div>
          )}

          {tasks.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>No tasks added yet</p>
              <p className="text-sm">Add a task to start tracking time</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default TaskTimer; 