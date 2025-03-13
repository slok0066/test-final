import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { RouteComponentProps } from 'wouter';

interface LoanResult {
  payment: number;
  totalPayment: number;
  totalInterest: number;
  amortization: {
    payment: number;
    period: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

const LoanCalculator: React.FC<RouteComponentProps> = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [result, setResult] = useState<LoanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInputs = (principal: number, annualRate: number, years: number) => {
    if (isNaN(principal)) {
      throw new Error('Please enter a valid loan amount');
    }
    if (principal <= 0) {
      throw new Error('Loan amount must be greater than zero');
    }
    if (isNaN(annualRate)) {
      throw new Error('Please enter a valid interest rate');
    }
    if (annualRate <= 0) {
      throw new Error('Interest rate must be greater than zero');
    }
    if (isNaN(years)) {
      throw new Error('Please enter a valid loan term');
    }
    if (years <= 0) {
      throw new Error('Loan term must be greater than zero');
    }
  };

  const calculateLoan = () => {
    setError(null);
    
    try {
      const principal = parseFloat(loanAmount);
      const annualRate = parseFloat(interestRate) / 100;
      const years = parseFloat(loanTerm);

      validateInputs(principal, annualRate, years);

      let periodsPerYear;
      switch (paymentFrequency) {
        case 'weekly':
          periodsPerYear = 52;
          break;
        case 'biweekly':
          periodsPerYear = 26;
          break;
        case 'monthly':
        default:
          periodsPerYear = 12;
          break;
      }

      const totalPeriods = years * periodsPerYear;
      const periodicRate = annualRate / periodsPerYear;

      // Calculate payment using the formula: PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
      const payment = principal * 
        (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / 
        (Math.pow(1 + periodicRate, totalPeriods) - 1);

      if (!isFinite(payment)) {
        throw new Error('The calculation resulted in an invalid amount. Please check your inputs.');
      }

      const totalPayment = payment * totalPeriods;
      const totalInterest = totalPayment - principal;

      // Calculate amortization schedule
      let balance = principal;
      const amortization = [];

      for (let period = 1; period <= totalPeriods; period++) {
        const interest = balance * periodicRate;
        const principalPart = payment - interest;
        balance = Math.max(0, balance - principalPart);

        amortization.push({
          period,
          payment,
          principal: principalPart,
          interest,
          balance
        });

        // Break if balance is effectively zero
        if (balance < 0.01) break;
      }

      setResult({
        payment,
        totalPayment,
        totalInterest,
        amortization
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
      setResult(null);
    }
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (loanAmount && interestRate && loanTerm) {
      calculateLoan();
    } else {
      setResult(null);
      setError(null);
    }
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);

  const getPaymentLabel = () => {
    switch (paymentFrequency) {
      case 'weekly':
        return 'Weekly';
      case 'biweekly':
        return 'Bi-weekly';
      case 'monthly':
      default:
        return 'Monthly';
    }
  };

  return (
    <ToolLayout title="Loan Calculator" description="Calculate loan payments and amortization schedule">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Loan Amount ($)</Label>
              <Input
                type="number"
                min="0"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Annual Interest Rate (%)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Loan Term (Years)</Label>
              <Input
                type="number"
                min="0"
                step="0.5"
                placeholder="Enter loan term"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Frequency</Label>
              <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {result && !error && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">{getPaymentLabel()} Payment</h3>
                  <p className="text-2xl font-bold">${result.payment.toFixed(2)}</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Payment</h3>
                  <p className="text-2xl font-bold">${result.totalPayment.toFixed(2)}</p>
                </Card>
                <Card className="p-4 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                  <p className="text-2xl font-bold">${result.totalInterest.toFixed(2)}</p>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Payment Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Period</th>
                        <th className="text-right py-2">Payment</th>
                        <th className="text-right py-2">Principal</th>
                        <th className="text-right py-2">Interest</th>
                        <th className="text-right py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.amortization.slice(0, 12).map((row) => (
                        <tr key={row.period} className="border-b">
                          <td className="py-2">{row.period}</td>
                          <td className="text-right">${row.payment.toFixed(2)}</td>
                          <td className="text-right">${row.principal.toFixed(2)}</td>
                          <td className="text-right">${row.interest.toFixed(2)}</td>
                          <td className="text-right">${row.balance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.amortization.length > 12 && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Showing first year of payments. Full schedule has {result.amortization.length} periods.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default LoanCalculator; 