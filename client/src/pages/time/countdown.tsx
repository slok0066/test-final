import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Play, Pause, RefreshCw } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && targetDate) {
      timer = setInterval(() => {
        const target = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference <= 0) {
          setIsRunning(false);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          toast({
            title: "Countdown complete!",
            variant: "default",
          });
          clearInterval(timer);
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, targetDate, toast]);

  const startTimer = () => {
    try {
      const target = new Date(targetDate);
      if (target <= new Date()) {
        throw new Error("Please select a future date and time");
      }
      setIsRunning(true);
      toast({
        title: "Timer started",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to start timer",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setTargetDate("");
  };

  return (
    <ToolLayout
      title="Countdown Timer"
      description="Create countdown timers for future events"
    >
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label>Target Date and Time</Label>
              <Input
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <Label>Days</Label>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <Label>Hours</Label>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <Label>Minutes</Label>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <Label>Seconds</Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                className="flex-1"
                variant={isRunning ? "outline" : "default"}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" /> Start
                  </>
                )}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
