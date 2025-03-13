import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function SleepTracker() {
  const [sleepTime, setSleepTime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('06:00');
  const [date, setDate] = useState<Date>(new Date());
  const [sleepRecords, setSleepRecords] = useState<Array<{
    date: Date;
    sleepTime: string;
    wakeTime: string;
    duration: string;
  }>>([]);

  const calculateDuration = (sleep: string, wake: string) => {
    const [sleepHour, sleepMinute] = sleep.split(':').map(Number);
    const [wakeHour, wakeMinute] = wake.split(':').map(Number);
    
    let hours = wakeHour - sleepHour;
    let minutes = wakeMinute - sleepMinute;
    
    if (hours < 0) hours += 24;
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const addSleepRecord = () => {
    const duration = calculateDuration(sleepTime, wakeTime);
    setSleepRecords([
      {
        date: date,
        sleepTime,
        wakeTime,
        duration
      },
      ...sleepRecords
    ]);
  };

  return (
    <ToolLayout title="Sleep Tracker" description="Track your sleep patterns">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sleep Time</Label>
              <Input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Wake Time</Label>
              <Input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </div>

          <Button onClick={addSleepRecord} className="w-full">
            Add Sleep Record
          </Button>

          {sleepRecords.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Sleep History</h3>
              <div className="space-y-2">
                {sleepRecords.map((record, index) => (
                  <div key={index} className="p-3 bg-secondary rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{format(record.date, 'MMM dd, yyyy')}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.sleepTime} - {record.wakeTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{record.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
