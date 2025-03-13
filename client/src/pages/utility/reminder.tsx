import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlarmClock, Bell, Calendar } from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  datetime: string;
  repeat: string;
  priority: string;
  completed: boolean;
}

const repeatOptions = [
  "Never",
  "Daily",
  "Weekly",
  "Monthly",
];

const priorityOptions = [
  { value: "low", label: "Low", color: "text-green-500" },
  { value: "medium", label: "Medium", color: "text-yellow-500" },
  { value: "high", label: "High", color: "text-red-500" },
];

export default function Reminder() {
  const [reminders, setReminders] = React.useState<Reminder[]>([]);
  const [title, setTitle] = React.useState("");
  const [datetime, setDatetime] = React.useState("");
  const [repeat, setRepeat] = React.useState("Never");
  const [priority, setPriority] = React.useState("medium");
  const [filter, setFilter] = React.useState("all");

  const addReminder = () => {
    if (!title || !datetime) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      title,
      datetime,
      repeat,
      priority,
      completed: false,
    };

    setReminders([...reminders, reminder]);
    setTitle("");
    setDatetime("");
    setRepeat("Never");
    setPriority("medium");
  };

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const filteredReminders = reminders.filter((reminder) => {
    if (filter === "all") return true;
    if (filter === "active") return !reminder.completed;
    if (filter === "completed") return reminder.completed;
    return reminder.priority === filter;
  });

  const sortedReminders = [...filteredReminders].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
    }
    return a.completed ? 1 : -1;
  });

  const isOverdue = (datetime: string) => {
    return new Date(datetime).getTime() < new Date().getTime();
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Reminders</h1>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter reminder title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                />
              </div>

              <div>
                <Label>Repeat</Label>
                <Select value={repeat} onValueChange={setRepeat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select repeat option" />
                  </SelectTrigger>
                  <SelectContent>
                    {repeatOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className={option.color}>{option.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={addReminder}
                className="self-end"
              >
                Add Reminder
              </Button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter reminders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reminders</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label} Priority
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-sm text-muted-foreground">
                {reminders.filter((r) => !r.completed).length} active reminders
              </span>
            </div>

            <div className="space-y-2">
              {sortedReminders.map((reminder) => (
                <Card
                  key={reminder.id}
                  className={`p-4 ${
                    reminder.completed ? "bg-secondary opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleReminder(reminder.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            reminder.completed
                              ? "bg-primary border-primary"
                              : "border-primary"
                          }`}
                        >
                          {reminder.completed && "✓"}
                        </button>
                        <h3
                          className={`font-semibold ${
                            reminder.completed ? "line-through" : ""
                          }`}
                        >
                          {reminder.title}
                        </h3>
                      </div>

                      <div className="ml-8 space-y-1 mt-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(reminder.datetime).toLocaleString()}
                          </span>
                          {isOverdue(reminder.datetime) && !reminder.completed && (
                            <span className="text-red-500">(Overdue)</span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <AlarmClock className="w-4 h-4" />
                            <span>{reminder.repeat}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bell className="w-4 h-4" />
                            <span className={priorityOptions.find(
                              (p) => p.value === reminder.priority
                            )?.color}>
                              {reminder.priority} priority
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}

              {sortedReminders.length === 0 && (
                <div className="text-center text-muted-foreground p-4">
                  No reminders found. Add some reminders to get started!
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
