import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'wouter';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ToolLayout } from '@/components/tool-layout';
import { Timer, Pause, Play, RotateCcw, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Break {
  type: 'posture' | 'screen';
  message: string;
  duration: number;
}

const ErgonomicTimer: React.FC<RouteComponentProps> = () => {
  const [screenTime, setScreenTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentBreak, setCurrentBreak] = useState<Break | null>(null);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setScreenTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    // Check for breaks based on screen time
    if (screenTime > 0 && screenTime % (20 * 60) === 0) { // 20-minute intervals
      suggestBreak('screen', '20-20-20 Rule: Look at something 20 feet away for 20 seconds', 20);
    } else if (screenTime % (30 * 60) === 0) { // 30-minute intervals
      suggestBreak('posture', 'Time for a posture check! Sit up straight and roll your shoulders', 30);
    }
  }, [screenTime]);

  useEffect(() => {
    let breakTimer: NodeJS.Timeout;
    if (currentBreak && breakTimeLeft > 0) {
      breakTimer = setInterval(() => {
        setBreakTimeLeft(prev => {
          if (prev <= 1) {
            endBreak();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(breakTimer);
  }, [currentBreak, breakTimeLeft]);

  const suggestBreak = (type: 'posture' | 'screen', message: string, duration: number) => {
    setCurrentBreak({ type, message, duration });
    setBreakTimeLeft(duration);
    setIsRunning(false);
    
    toast({
      title: "Break Time!",
      description: message,
    });
  };

  const endBreak = () => {
    setCurrentBreak(null);
    setBreakTimeLeft(0);
    setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setScreenTime(0);
    setCurrentBreak(null);
    setBreakTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ToolLayout title="Ergonomic Timer" description="Smart breaks based on posture detection and screen time">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* Main Timer Display */}
          <div className="text-center space-y-4">
            <div className="text-4xl font-mono font-bold">
              {formatTime(screenTime)}
            </div>
            <p className="text-sm text-muted-foreground">
              Screen Time
            </p>
          </div>

          {/* Break Alert */}
          {currentBreak && (
            <Card className="p-4 bg-primary/10 border-2 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Break Time!</h3>
                </div>
                <p className="text-sm">{currentBreak.message}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Time Remaining</span>
                    <span>{breakTimeLeft}s</span>
                  </div>
                  <Progress value={(breakTimeLeft / currentBreak.duration) * 100} />
                </div>
              </div>
            </Card>
          )}

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={isRunning ? "outline" : "default"}
              size="lg"
              onClick={toggleTimer}
              disabled={!!currentBreak}
            >
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={resetTimer}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Tips */}
          <div className="text-sm text-muted-foreground space-y-2">
            <h3 className="font-medium text-foreground">Ergonomic Tips:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Keep your screen at arm's length</li>
              <li>Position the top of your screen at or slightly below eye level</li>
              <li>Keep your feet flat on the floor</li>
              <li>Take regular breaks using the 20-20-20 rule</li>
              <li>Maintain good posture with shoulders relaxed</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ErgonomicTimer; 