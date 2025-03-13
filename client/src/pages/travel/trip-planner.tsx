import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { ToolLayout } from '@/components/tool-layout';
import { format } from "date-fns";
import { Trash2 } from 'lucide-react';

interface Activity {
  id: number;
  time: string;
  description: string;
}

interface DayPlan {
  id: number;
  date: Date;
  activities: Activity[];
}

export default function TripPlanner() {
  const [plans, setPlans] = useState<DayPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newActivity, setNewActivity] = useState({ time: '', description: '' });

  const addDay = () => {
    const existingDay = plans.find(plan => 
      format(plan.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );

    if (!existingDay) {
      setPlans([...plans, {
        id: Date.now(),
        date: selectedDate,
        activities: []
      }]);
    }
  };

  const addActivity = (dayId: number) => {
    if (!newActivity.time || !newActivity.description) return;

    setPlans(plans.map(plan => {
      if (plan.id === dayId) {
        return {
          ...plan,
          activities: [...plan.activities, {
            id: Date.now(),
            time: newActivity.time,
            description: newActivity.description
          }]
        };
      }
      return plan;
    }));

    setNewActivity({ time: '', description: '' });
  };

  const removeActivity = (dayId: number, activityId: number) => {
    setPlans(plans.map(plan => {
      if (plan.id === dayId) {
        return {
          ...plan,
          activities: plan.activities.filter(activity => activity.id !== activityId)
        };
      }
      return plan;
    }));
  };

  const removeDay = (dayId: number) => {
    setPlans(plans.filter(plan => plan.id !== dayId));
  };

  return (
    <ToolLayout title="Trip Planner" description="Plan your travel itinerary">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Select Date</Label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </div>
              <Button onClick={addDay}>Add Day</Button>
            </div>
          </div>

          {plans.sort((a, b) => a.date.getTime() - b.date.getTime()).map(plan => (
            <Card key={plan.id} className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {format(plan.date, 'EEEE, MMMM d, yyyy')}
                </h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeDay(plan.id)}
                >
                  Remove Day
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({
                        ...newActivity,
                        time: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Activity</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter activity"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({
                          ...newActivity,
                          description: e.target.value
                        })}
                      />
                      <Button onClick={() => addActivity(plan.id)}>Add</Button>
                    </div>
                  </div>
                </div>

                {plan.activities.sort((a, b) => a.time.localeCompare(b.time)).map(activity => (
                  <div
                    key={activity.id}
                    className="flex justify-between items-center p-2 bg-secondary rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{activity.time}</span>
                      <span className="mx-2">-</span>
                      <span>{activity.description}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeActivity(plan.id, activity.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </ToolLayout>
  );
}
