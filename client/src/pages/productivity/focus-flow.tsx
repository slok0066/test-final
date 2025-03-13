import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Battery,
  BatteryMedium,
  BatteryLow,
  Clock,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ToolLayout } from "@/components/tool-layout";

interface Task {
  id: string;
  name: string;
  energyLevel: "high" | "medium" | "low";
  duration: number; // in minutes
  completed: boolean;
}

const ENERGY_LEVELS = {
  high: {
    icon: Battery,
    color: "text-green-500",
    tasks: ["Deep work", "Problem solving", "Creative work", "Learning"],
  },
  medium: {
    icon: BatteryMedium,
    color: "text-yellow-500",
    tasks: ["Emails", "Planning", "Documentation", "Team meetings"],
  },
  low: {
    icon: BatteryLow,
    color: "text-red-500",
    tasks: ["Admin work", "Organization", "Light reading", "Review"],
  },
};

const FocusFlow: React.FC<RouteComponentProps> = () => {
  const [currentEnergyLevel, setCurrentEnergyLevel] = useState<
    "high" | "medium" | "low"
  >("high");
  const [suggestedTasks, setSuggestedTasks] = useState<Task[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Generate suggested tasks based on energy level
    const tasks = ENERGY_LEVELS[currentEnergyLevel].tasks.map((task) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: task,
      energyLevel: currentEnergyLevel,
      duration: currentEnergyLevel === "high" ? 45 : currentEnergyLevel === "medium" ? 30 : 20,
      completed: false,
    }));
    setSuggestedTasks(tasks);
  }, [currentEnergyLevel]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Move to next task
            if (currentTaskIndex < suggestedTasks.length - 1) {
              setCurrentTaskIndex((prev) => prev + 1);
              return suggestedTasks[currentTaskIndex + 1].duration * 60;
            } else {
              setIsSessionActive(false);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, timeRemaining, currentTaskIndex, suggestedTasks]);

  const startSession = () => {
    setIsSessionActive(true);
    setCurrentTaskIndex(0);
    setTimeRemaining(suggestedTasks[0].duration * 60);
  };

  const pauseSession = () => {
    setIsSessionActive(false);
  };

  const resetSession = () => {
    setIsSessionActive(false);
    setCurrentTaskIndex(0);
    setTimeRemaining(0);
    setSuggestedTasks((prev) =>
      prev.map((task) => ({ ...task, completed: false }))
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const currentTask = suggestedTasks[currentTaskIndex];
  const progress =
    currentTask && timeRemaining > 0
      ? ((currentTask.duration * 60 - timeRemaining) / (currentTask.duration * 60)) * 100
      : 0;

  return (
    <ToolLayout 
      title="Focus Flow" 
      description="AI-powered work session planner based on your energy levels"
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Focus Flow</CardTitle>
          <CardDescription>
            AI-powered work session planner based on your energy levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Energy Level Selector */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Current Energy Level</h3>
              <Select
                value={currentEnergyLevel}
                onValueChange={(value: "high" | "medium" | "low") =>
                  setCurrentEnergyLevel(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Energy</SelectItem>
                  <SelectItem value="medium">Medium Energy</SelectItem>
                  <SelectItem value="low">Low Energy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Current Task */}
            {currentTask && (
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-bold">{currentTask.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentTask.duration} minutes
                        </p>
                      </div>
                      <div className={ENERGY_LEVELS[currentTask.energyLevel].color}>
                        {React.createElement(ENERGY_LEVELS[currentTask.energyLevel].icon, {
                          className: "w-6 h-6",
                        })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{formatTime(timeRemaining)}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!isSessionActive ? (
                <Button onClick={startSession} disabled={suggestedTasks.length === 0}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Session
                </Button>
              ) : (
                <Button onClick={pauseSession} variant="secondary">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={resetSession} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Suggested Tasks</h3>
              <div className="grid gap-2">
                {suggestedTasks.map((task, index) => (
                  <Card
                    key={task.id}
                    className={`${
                      index === currentTaskIndex ? "border-primary" : ""
                    }`}
                  >
                    <CardContent className="py-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className={`${
                              ENERGY_LEVELS[task.energyLevel].color
                            }`}
                          >
                            {React.createElement(
                              ENERGY_LEVELS[task.energyLevel].icon,
                              {
                                className: "w-4 h-4",
                              }
                            )}
                          </div>
                          <span
                            className={`${
                              task.completed ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {task.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {task.duration} min
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default FocusFlow; 