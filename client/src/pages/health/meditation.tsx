import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function MeditationTimer() {
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [ambientSound, setAmbientSound] = useState('none');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Play completion sound
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDurationChange = (value: number[]) => {
    setDuration(value[0]);
    setTimeLeft(value[0] * 60);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
  };

  return (
    <ToolLayout title="Meditation Timer" description="Timer for meditation sessions">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Duration (minutes)</Label>
            <Slider
              defaultValue={[5]}
              max={60}
              min={1}
              step={1}
              value={[duration]}
              onValueChange={handleDurationChange}
              disabled={isRunning}
            />
            <p className="text-sm text-muted-foreground text-center">{duration} minutes</p>
          </div>

          <div className="space-y-2">
            <Label>Ambient Sound</Label>
            <Select
              value={ambientSound}
              onValueChange={setAmbientSound}
              disabled={isRunning}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="rain">Rain</SelectItem>
                <SelectItem value="waves">Ocean Waves</SelectItem>
                <SelectItem value="forest">Forest</SelectItem>
                <SelectItem value="white-noise">White Noise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-center py-8">
            <div className="text-4xl font-mono mb-8">
              {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant={isRunning ? "outline" : "default"}
                size="lg"
                onClick={toggleTimer}
              >
                {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={resetTimer}
                disabled={isRunning}
              >
                <RotateCcw className="mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Find a comfortable position and focus on your breath</p>
            <p>When your mind wanders, gently bring it back to your breath</p>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
