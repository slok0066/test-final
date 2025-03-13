import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';

interface InvestmentResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: {
    year: number;
    balance: number;
    contributions: number;
    interest: number;
  }[];
}

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('monthly');
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const calculateInvestment = () => {
    const principal = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) / 100;
    const years = parseFloat(investmentPeriod);

    if (isNaN(rate) || isNaN(years)) return;

    let yearlyBreakdown = [];
    let balance = principal;
    let totalContributions = principal;
    
    // Calculate compound interest with monthly contributions
    for (let year = 1; year <= years; year++) {
      const yearlyContribution = monthly * 12;
      totalContributions += yearlyContribution;
      
      // Compound interest formula with monthly contributions
      const interestEarned = balance * rate + (yearlyContribution * rate / 2);
      balance = balance + yearlyContribution + interestEarned;

      yearlyBreakdown.push({
        year,
        balance,
        contributions: totalContributions,
        interest: balance - totalContributions
      });
    }

    setResult({
      futureValue: balance,
      totalContributions,
      totalInterest: balance - totalContributions,
      yearlyBreakdown
    });
  };

  return (
    <ToolLayout title="Investment Calculator" description="Calculate potential returns on your investments">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Initial Investment ($)</Label>
              <Input
                type="number"
                placeholder="Enter initial amount"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Monthly Contribution ($)</Label>
              <Input
                type="number"
                placeholder="Enter monthly contribution"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Annual Return Rate (%)</Label>
              <Input
                type="number"
                placeholder="Enter expected return rate"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Investment Period (Years)</Label>
              <Input
                type="number"
                placeholder="Enter number of years"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Compounding Frequency</Label>
              <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateInvestment} className="w-full">
            Calculate
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Future Value</h3>
                  <p className="text-2xl font-bold">${result.futureValue.toFixed(2)}</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Contributions</h3>
                  <p className="text-2xl font-bold">${result.totalContributions.toFixed(2)}</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                  <p className="text-2xl font-bold">${result.totalInterest.toFixed(2)}</p>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Yearly Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Year</th>
                        <th className="text-right py-2">Balance</th>
                        <th className="text-right py-2">Contributions</th>
                        <th className="text-right py-2">Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.map((year) => (
                        <tr key={year.year} className="border-b">
                          <td className="py-2">{year.year}</td>
                          <td className="text-right">${year.balance.toFixed(2)}</td>
                          <td className="text-right">${year.contributions.toFixed(2)}</td>
                          <td className="text-right">${year.interest.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
} 