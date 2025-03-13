import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';

export default function SavingsCalculator() {
  const [principal, setPrincipal] = useState('');
  const [monthlyDeposit, setMonthlyDeposit] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<{ total: number; interest: number } | null>(null);

  const calculateSavings = () => {
    const p = parseFloat(principal);
    const pmt = parseFloat(monthlyDeposit);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(p) || isNaN(pmt) || isNaN(r) || isNaN(n)) return;

    const futureValue = p * Math.pow(1 + r, n) + 
      pmt * ((Math.pow(1 + r, n) - 1) / r);
    const totalContributed = p + (pmt * n);
    const interestEarned = futureValue - totalContributed;

    setResult({
      total: futureValue,
      interest: interestEarned
    });
  };

  return (
    <ToolLayout title="Savings Calculator" description="Calculate your savings growth">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Initial Amount ($)</Label>
              <Input
                type="number"
                placeholder="Enter initial amount"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Monthly Deposit ($)</Label>
              <Input
                type="number"
                placeholder="Enter monthly deposit"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Annual Interest Rate (%)</Label>
              <Input
                type="number"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Time Period (Years)</Label>
              <Input
                type="number"
                placeholder="Enter number of years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateSavings} className="w-full">
            Calculate
          </Button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Results</h3>
                <div className="space-y-2">
                  <p>
                    Total Savings: <span className="font-bold">${result.total.toFixed(2)}</span>
                  </p>
                  <p>
                    Interest Earned: <span className="font-bold">${result.interest.toFixed(2)}</span>
                  </p>
                  <p>
                    Total Contributed: <span className="font-bold">
                      ${(parseFloat(principal) + (parseFloat(monthlyDeposit) * parseFloat(years) * 12)).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
