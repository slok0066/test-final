import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'wouter';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ToolLayout } from '@/components/tool-layout';
import { Heart, Wind, Timer, Activity } from 'lucide-react';

interface BreathingPattern {
  name: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  description: string;
}

const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    name: "Box Breathing",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    description: "Equal parts inhale, hold, exhale, and hold. Great for stress relief."
  },
  {
    name: "4-7-8 Breathing",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    description: "Calming breath pattern that promotes better sleep and reduces anxiety."
  },
  {
    name: "Energizing Breath",
    inhale: 6,
    hold1: 0,
    exhale: 2,
    hold2: 0,
    description: "Quick, energizing pattern to increase alertness and focus."
  }
];

const FocusBreath: React.FC<RouteComponentProps> = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [heartRate, setHeartRate] = useState(70);
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            // Move to next phase
            switch (phase) {
              case 'inhale':
                setPhase('hold1');
                return selectedPattern.hold1;
              case 'hold1':
                setPhase('exhale');
                return selectedPattern.exhale;
              case 'exhale':
                setPhase('hold2');
                return selectedPattern.hold2;
              case 'hold2':
                setPhase('inhale');
                setBreathCount(prev => prev + 1);
                return selectedPattern.inhale;
            }
          }
          return prev - 0.1;
        });

        // Simulate heart rate changes
        setHeartRate(prev => prev + (Math.random() - 0.5) * 2);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isActive, phase, selectedPattern]);

  const startBreathing = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimeLeft(selectedPattern.inhale);
    setBreathCount(0);
  };

  const stopBreathing = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Inhale';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Exhale';
      case 'hold2': return 'Hold';
    }
  };

  const getProgress = () => {
    const total = selectedPattern[phase];
    return ((total - timeLeft) / total) * 100;
  };

  return (
    <ToolLayout title="Focus Breath" description="Breathing exercises synchronized with your heart rate">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* Pattern Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Breathing Pattern</label>
            <Select
              value={selectedPattern.name}
              onValueChange={(value) => {
                const pattern = BREATHING_PATTERNS.find(p => p.name === value);
                if (pattern) setSelectedPattern(pattern);
              }}
              disabled={isActive}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a breathing pattern" />
              </SelectTrigger>
              <SelectContent>
                {BREATHING_PATTERNS.map((pattern) => (
                  <SelectItem key={pattern.name} value={pattern.name}>
                    <div className="flex flex-col">
                      <span>{pattern.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {pattern.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Visualization */}
          <Card className="p-6 bg-primary/5">
            <div className="space-y-6">
              {isActive && (
                <>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold">{getPhaseText()}</h3>
                    <p className="text-sm text-muted-foreground">
                      {Math.ceil(timeLeft)} seconds
                    </p>
                  </div>
                  <Progress value={getProgress()} className="h-2" />
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Heart Rate</p>
                    <p className="text-2xl font-bold">{Math.round(heartRate)} BPM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Breaths</p>
                    <p className="text-2xl font-bold">{breathCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              onClick={isActive ? stopBreathing : startBreathing}
              variant={isActive ? "outline" : "default"}
            >
              {isActive ? (
                <>
                  <Timer className="mr-2 h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-4 w-4" />
                  Start
                </>
              )}
            </Button>
          </div>

          {/* Pattern Details */}
          <div className="text-sm text-muted-foreground space-y-2">
            <h3 className="font-medium text-foreground">Pattern Details:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>Inhale: {selectedPattern.inhale}s</p>
                <p>Hold: {selectedPattern.hold1}s</p>
              </div>
              <div>
                <p>Exhale: {selectedPattern.exhale}s</p>
                <p>Hold: {selectedPattern.hold2}s</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default FocusBreath; 