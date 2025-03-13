import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { format } from "date-fns";

interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate: Date;
  category: string;
  status: 'pending' | 'paid';
}

export default function BillReminder() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    dueDate: new Date(),
    category: 'utilities'
  });

  const addBill = () => {
    if (!newBill.name || !newBill.amount) return;

    const bill: Bill = {
      id: Date.now(),
      name: newBill.name,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      category: newBill.category,
      status: 'pending'
    };

    setBills([...bills, bill]);
    setNewBill({
      name: '',
      amount: '',
      dueDate: new Date(),
      category: 'utilities'
    });
  };

  const toggleBillStatus = (id: number) => {
    setBills(bills.map(bill => 
      bill.id === id 
        ? { ...bill, status: bill.status === 'pending' ? 'paid' : 'pending' }
        : bill
    ));
  };

  const deleteBill = (id: number) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  return (
    <ToolLayout title="Bill Reminder" description="Never miss a bill payment">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bill Name</Label>
              <Input
                placeholder="Enter bill name"
                value={newBill.name}
                onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={newBill.amount}
                onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newBill.category}
                onValueChange={(value) => setNewBill({ ...newBill, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="rent">Rent/Mortgage</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="subscription">Subscriptions</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Calendar
                mode="single"
                selected={newBill.dueDate}
                onSelect={(date) => date && setNewBill({ ...newBill, dueDate: date })}
                className="rounded-md border"
              />
            </div>
          </div>

          <Button onClick={addBill} className="w-full">
            Add Bill
          </Button>

          {bills.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Bills</h3>
              <div className="space-y-2">
                {bills.map((bill) => (
                  <div
                    key={bill.id}
                    className="p-4 bg-secondary rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {format(bill.dueDate, 'MMM dd, yyyy')} • {bill.category}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">${bill.amount}</p>
                      <Button
                        variant={bill.status === 'paid' ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleBillStatus(bill.id)}
                      >
                        {bill.status === 'paid' ? 'Paid' : 'Mark as Paid'}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteBill(bill.id)}
                      >
                        Delete
                      </Button>
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
