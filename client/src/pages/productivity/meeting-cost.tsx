import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Plus, Trash2 } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

interface Participant {
  id: string;
  role: string;
  salary: number;
}

const MeetingCost: React.FC<RouteComponentProps> = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [duration, setDuration] = useState(60); // duration in minutes
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const addParticipant = () => {
    const newParticipant: Participant = {
      id: Math.random().toString(36).substr(2, 9),
      role: "",
      salary: 0,
    };
    setParticipants([...participants, newParticipant]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const updateParticipant = (
    id: string,
    field: keyof Participant,
    value: string | number
  ) => {
    setParticipants(
      participants.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const calculateCost = (timeInMinutes: number) => {
    const totalHourlyCost = participants.reduce((acc, p) => acc + p.salary, 0);
    const costPerMinute = totalHourlyCost / 60;
    return (costPerMinute * timeInMinutes).toFixed(2);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          const newTime = prev + 1;
          setTotalCost(Number(calculateCost(newTime)));
          return newTime;
        });
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [isRunning, participants]);

  return (
    <ToolLayout 
      title="Meeting Cost Calculator" 
      description="Track the real-time cost of your meetings based on participants' hourly rates"
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Meeting Cost Calculator</CardTitle>
          <CardDescription>
            Track the real-time cost of your meetings based on participants' hourly rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">
                  ${totalCost}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Total Cost ({elapsedTime} minutes)
                </p>
              </div>
              <Button
                onClick={() => {
                  if (!isRunning) {
                    setElapsedTime(0);
                    setTotalCost(0);
                  }
                  setIsRunning(!isRunning);
                }}
                variant={isRunning ? "destructive" : "default"}
              >
                {isRunning ? "Stop Meeting" : "Start Meeting"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Participants</h3>
                <Button onClick={addParticipant} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Participant
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Hourly Rate ($)</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <Input
                          value={participant.role}
                          onChange={(e) =>
                            updateParticipant(participant.id, "role", e.target.value)
                          }
                          placeholder="Job Title"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={participant.salary}
                          onChange={(e) =>
                            updateParticipant(
                              participant.id,
                              "salary",
                              Number(e.target.value)
                            )
                          }
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeParticipant(participant.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default MeetingCost; 