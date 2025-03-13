import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Play, Pause, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface Timer {
  id: number;
  name: string;
  duration: number;
  timeLeft: number;
  isRunning: boolean;
}

export default function CookingTimer() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newTimer, setNewTimer] = useState({
    name: '',
    minutes: '',
    seconds: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer => {
          if (timer.isRunning && timer.timeLeft > 0) {
            return { ...timer, timeLeft: timer.timeLeft - 1 };
          } else if (timer.isRunning && timer.timeLeft === 0) {
            // Play sound or show notification when timer completes
            return { ...timer, isRunning: false };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = () => {
    const minutes = parseInt(newTimer.minutes) || 0;
    const seconds = parseInt(newTimer.seconds) || 0;
    const duration = (minutes * 60) + seconds;

    if (duration === 0 || !newTimer.name) return;

    const timer: Timer = {
      id: Date.now(),
      name: newTimer.name,
      duration,
      timeLeft: duration,
      isRunning: false
    };

    setTimers([...timers, timer]);
    setNewTimer({
      name: '',
      minutes: '',
      seconds: ''
    });
  };

  const toggleTimer = (id: number) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
    ));
  };

  const resetTimer = (id: number) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, timeLeft: timer.duration, isRunning: false } : timer
    ));
  };

  const removeTimer = (id: number) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ToolLayout title="Cooking Timer" description="Multiple timers for cooking">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Timer Name</Label>
              <Input
                placeholder="Enter timer name"
                value={newTimer.name}
                onChange={(e) => setNewTimer({ ...newTimer, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Minutes</Label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={newTimer.minutes}
                onChange={(e) => setNewTimer({ ...newTimer, minutes: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Seconds</Label>
              <Input
                type="number"
                min="0"
                max="59"
                placeholder="0"
                value={newTimer.seconds}
                onChange={(e) => setNewTimer({ ...newTimer, seconds: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addTimer} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Timer
          </Button>

          <div className="space-y-4">
            {timers.map(timer => (
              <Card key={timer.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-center md:text-left">
                    <h3 className="font-medium">{timer.name}</h3>
                    <p className="text-2xl font-mono">
                      {formatTime(timer.timeLeft)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={timer.isRunning ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleTimer(timer.id)}
                    >
                      {timer.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetTimer(timer.id)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTimer(timer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-1000"
                    style={{
                      width: `${(timer.timeLeft / timer.duration) * 100}%`
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>

          {timers.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>No timers added yet</p>
              <p className="text-sm">Add a timer to get started</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
