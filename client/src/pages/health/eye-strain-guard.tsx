import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'wouter';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ToolLayout } from '@/components/tool-layout';
import { Eye, Sun, Moon, AlertTriangle, Clock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface EyeStrainData {
  timestamp: number;
  strainScore: number;
  duration: number;
}

const EyeStrainGuard: React.FC<RouteComponentProps> = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [ambientLight, setAmbientLight] = useState(0);
  const [screenBrightness, setScreenBrightness] = useState(100);
  const [eyeStrainScore, setEyeStrainScore] = useState(0);
  const [screenTime, setScreenTime] = useState(0);
  const [strainHistory, setStrainHistory] = useState<EyeStrainData[]>([]);
  const { toast } = useToast();

  // Function to request ambient light sensor access
  const setupAmbientLightSensor = useCallback(async () => {
    try {
      // Check if the AmbientLightSensor API is available
      if ('AmbientLightSensor' in window) {
        const sensor = new (window as any).AmbientLightSensor();
        sensor.addEventListener('reading', () => {
          // Convert lux to percentage (assuming max 1000 lux for indoor lighting)
          const percentage = Math.min(100, (sensor.illuminance / 1000) * 100);
          setAmbientLight(percentage);
        });
        sensor.start();
      } else {
        // Fallback to simulated values if sensor is not available
        console.warn('AmbientLightSensor not available, using simulated values');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error accessing ambient light sensor:', error);
      return false;
    }
  }, []);

  // Function to attempt to control screen brightness
  const updateSystemBrightness = useCallback(async (brightness: number) => {
    try {
      if ('screen' in navigator && 'brightness' in (navigator as any).screen) {
        await (navigator as any).screen.brightness.set(brightness / 100);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error setting screen brightness:', error);
      return false;
    }
  }, []);

  // Enhanced eye strain calculation
  const calculateEyeStrain = useCallback((light: number, brightness: number, duration: number) => {
    // Factors contributing to eye strain:
    // 1. Brightness difference (0-40 points)
    const brightnessDiff = Math.abs(light - brightness);
    const brightnessFactor = (brightnessDiff / 100) * 40;

    // 2. Screen time (0-30 points)
    const screenTimeFactor = Math.min(30, (duration / 3600) * 30);

    // 3. Ambient light level (0-30 points)
    // Too dark or too bright environments
    const ambientFactor = light < 20 || light > 80 ? 30 : 
                         light < 30 || light > 70 ? 20 : 
                         light < 40 || light > 60 ? 10 : 0;

    const totalScore = Math.min(100, brightnessFactor + screenTimeFactor + ambientFactor);
    setEyeStrainScore(totalScore);

    // Record strain history
    setStrainHistory(prev => [...prev, {
      timestamp: Date.now(),
      strainScore: totalScore,
      duration: duration
    }]);

    // Trigger break suggestions based on combined factors
    if (totalScore > 70 || duration > 1200) { // 20 minutes
      suggestBreak(totalScore > 70 ? 'High eye strain detected' : 'Extended screen time');
    }
  }, []);

  // Main monitoring effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let startTime = Date.now();
    let sensorAvailable = false;

    const initializeMonitoring = async () => {
      if (isMonitoring) {
        sensorAvailable = await setupAmbientLightSensor();
        timer = setInterval(() => {
          const duration = (Date.now() - startTime) / 1000;
          setScreenTime(duration);

          if (!sensorAvailable) {
            // Simulate ambient light changes if sensor is not available
            const newLight = Math.random() * 100;
            setAmbientLight(newLight);
          }

          calculateEyeStrain(ambientLight, screenBrightness, duration);
        }, 1000);
      }
    };

    initializeMonitoring();

    return () => {
      clearInterval(timer);
    };
  }, [isMonitoring, screenBrightness, ambientLight, calculateEyeStrain, setupAmbientLightSensor]);

  // Screen brightness effect
  useEffect(() => {
    updateSystemBrightness(screenBrightness);
  }, [screenBrightness, updateSystemBrightness]);

  const suggestBreak = (reason: string) => {
    toast({
      title: "Eye Care Alert",
      description: `${reason}. Take a 20-second break and look at something 20 feet away.`,
      duration: 10000,
    });
  };

  const getEyeStrainLevel = () => {
    if (eyeStrainScore < 30) return { text: 'Low', color: 'text-green-500' };
    if (eyeStrainScore < 70) return { text: 'Moderate', color: 'text-yellow-500' };
    return { text: 'High', color: 'text-red-500' };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBrightnessRecommendation = () => {
    if (ambientLight > screenBrightness + 20) {
      return "Screen too dim for current environment";
    }
    if (ambientLight < screenBrightness - 20) {
      return "Screen too bright for current environment";
    }
    return "Screen brightness is optimal";
  };

  return (
    <ToolLayout title="Eye Strain Guard" description="Monitor screen brightness and suggest breaks using ambient light">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* Status Display */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Ambient Light</h3>
                </div>
                <Progress value={ambientLight} />
                <p className="text-sm text-muted-foreground">{Math.round(ambientLight)}% brightness</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Eye Strain Level</h3>
                </div>
                <Progress 
                  value={eyeStrainScore} 
                  className={
                    eyeStrainScore > 70 ? "bg-red-100" : 
                    eyeStrainScore > 30 ? "bg-yellow-100" : "bg-green-100"
                  } 
                />
                <p className={`text-sm font-medium ${getEyeStrainLevel().color}`}>
                  {getEyeStrainLevel().text} ({Math.round(eyeStrainScore)}%)
                </p>
              </div>
            </Card>
          </div>

          {/* Screen Time */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Screen Time</h3>
              </div>
              <p className="text-xl font-bold">{formatTime(screenTime)}</p>
            </div>
          </Card>

          {/* Screen Brightness Control */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Screen Brightness</h3>
              <span className="text-sm text-muted-foreground">{screenBrightness}%</span>
            </div>
            <div className="flex items-center space-x-4">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[screenBrightness]}
                onValueChange={([value]) => setScreenBrightness(value)}
                max={100}
                step={1}
              />
              <Sun className="h-4 w-4 text-yellow-500" />
            </div>
            <p className={`text-sm ${
              getBrightnessRecommendation() === "Screen brightness is optimal" 
                ? "text-green-500" 
                : "text-yellow-500"
            }`}>
              {getBrightnessRecommendation()}
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center">
            <Button
              variant={isMonitoring ? "outline" : "default"}
              size="lg"
              onClick={() => {
                setIsMonitoring(!isMonitoring);
                if (!isMonitoring) {
                  setScreenTime(0);
                  setStrainHistory([]);
                }
              }}
            >
              {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            </Button>
          </div>

          {/* Tips */}
          <div className="text-sm text-muted-foreground space-y-2">
            <h3 className="font-medium text-foreground">Eye Care Tips:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds</li>
              <li>Adjust screen brightness to match your environment</li>
              <li>Position your screen at arm's length</li>
              <li>Reduce glare by adjusting room lighting</li>
              <li>Blink regularly to keep your eyes moist</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default EyeStrainGuard; 