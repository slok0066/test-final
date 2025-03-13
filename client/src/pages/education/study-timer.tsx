import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Play, Pause, RotateCcw, Settings2 } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface TimerSettings {
  studyDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
}

type TimerMode = 'study' | 'shortBreak' | 'longBreak';

export default function StudyTimer() {
  const [settings, setSettings] = useState<TimerSettings>({
    studyDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4
  });

  const [timeLeft, setTimeLeft] = useState(settings.studyDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('study');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    playNotificationSound();

    if (mode === 'study') {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);

      if (newSessionsCompleted % settings.sessionsBeforeLongBreak === 0) {
        setMode('longBreak');
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(settings.shortBreakDuration * 60);
      }
    } else {
      setMode('study');
      setTimeLeft(settings.studyDuration * 60);
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(() => {
      // Handle browsers that block autoplay
      console.log('Audio playback was blocked');
    });
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode('study');
    setTimeLeft(settings.studyDuration * 60);
    setSessionsCompleted(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerTitle = () => {
    switch (mode) {
      case 'study':
        return 'Study Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  const getCurrentDuration = () => {
    switch (mode) {
      case 'study':
        return settings.studyDuration;
      case 'shortBreak':
        return settings.shortBreakDuration;
      case 'longBreak':
        return settings.longBreakDuration;
    }
  };

  return (
    <ToolLayout title="Study Timer" description="Pomodoro timer for effective studying">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{getTimerTitle()}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings2 className="h-5 w-5" />
            </Button>
          </div>

          {showSettings ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Study Duration (minutes)</Label>
                <Slider
                  value={[settings.studyDuration]}
                  onValueChange={(value) => setSettings({ ...settings, studyDuration: value[0] })}
                  min={1}
                  max={60}
                  step={1}
                />
                <p className="text-sm text-muted-foreground text-center">{settings.studyDuration} minutes</p>
              </div>

              <div className="space-y-2">
                <Label>Short Break Duration (minutes)</Label>
                <Slider
                  value={[settings.shortBreakDuration]}
                  onValueChange={(value) => setSettings({ ...settings, shortBreakDuration: value[0] })}
                  min={1}
                  max={30}
                  step={1}
                />
                <p className="text-sm text-muted-foreground text-center">{settings.shortBreakDuration} minutes</p>
              </div>

              <div className="space-y-2">
                <Label>Long Break Duration (minutes)</Label>
                <Slider
                  value={[settings.longBreakDuration]}
                  onValueChange={(value) => setSettings({ ...settings, longBreakDuration: value[0] })}
                  min={5}
                  max={60}
                  step={1}
                />
                <p className="text-sm text-muted-foreground text-center">{settings.longBreakDuration} minutes</p>
              </div>

              <div className="space-y-2">
                <Label>Sessions Before Long Break</Label>
                <Slider
                  value={[settings.sessionsBeforeLongBreak]}
                  onValueChange={(value) => setSettings({ ...settings, sessionsBeforeLongBreak: value[0] })}
                  min={2}
                  max={8}
                  step={1}
                />
                <p className="text-sm text-muted-foreground text-center">{settings.sessionsBeforeLongBreak} sessions</p>
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-mono font-bold">
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-current text-secondary"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-current text-primary"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - timeLeft / (getCurrentDuration() * 60))}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
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
                >
                  <RotateCcw className="mr-2" />
                  Reset
                </Button>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Sessions completed: {sessionsCompleted}
                </p>
                <p className="text-sm text-muted-foreground">
                  Next long break in: {settings.sessionsBeforeLongBreak - (sessionsCompleted % settings.sessionsBeforeLongBreak)} sessions
                </p>
              </div>
            </>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
