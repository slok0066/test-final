import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Calculator, History, Trash2, Copy } from 'lucide-react';
import { RouteComponentProps } from 'wouter';

interface CalculationHistory {
  id: number;
  expression: string;
  result: string;
  timestamp: Date;
  category: string;
}

export default function MathCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [mode, setMode] = useState<'basic' | 'scientific'>('basic');

  const basicOperations = [
    { symbol: '7', type: 'number' },
    { symbol: '8', type: 'number' },
    { symbol: '9', type: 'number' },
    { symbol: '÷', type: 'operator' },
    { symbol: '4', type: 'number' },
    { symbol: '5', type: 'number' },
    { symbol: '6', type: 'number' },
    { symbol: '×', type: 'operator' },
    { symbol: '1', type: 'number' },
    { symbol: '2', type: 'number' },
    { symbol: '3', type: 'number' },
    { symbol: '-', type: 'operator' },
    { symbol: '0', type: 'number' },
    { symbol: '.', type: 'number' },
    { symbol: '=', type: 'equals' },
    { symbol: '+', type: 'operator' }
  ];

  const scientificOperations = [
    { symbol: 'sin', type: 'function' },
    { symbol: 'cos', type: 'function' },
    { symbol: 'tan', type: 'function' },
    { symbol: 'π', type: 'constant' },
    { symbol: 'log', type: 'function' },
    { symbol: 'ln', type: 'function' },
    { symbol: 'e', type: 'constant' },
    { symbol: '^', type: 'operator' },
    { symbol: '√', type: 'function' },
    { symbol: '(', type: 'parenthesis' },
    { symbol: ')', type: 'parenthesis' },
    { symbol: '!', type: 'operator' }
  ];

  const handleButtonClick = (symbol: string, type: string) => {
    setError(null);

    if (type === 'equals') {
      calculate();
    } else if (type === 'function') {
      setInput(prev => `${prev}${symbol}(`);
    } else {
      setInput(prev => prev + symbol);
    }
  };

  const calculate = () => {
    try {
      let expression = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');

      // Handle factorial
      while (expression.includes('!')) {
        expression = expression.replace(/(\d+)!/, (match, number) => {
          let result = 1;
          for (let i = 2; i <= parseInt(number); i++) {
            result *= i;
          }
          return result.toString();
        });
      }

      const calculatedResult = eval(expression);
      const formattedResult = Number.isInteger(calculatedResult)
        ? calculatedResult.toString()
        : calculatedResult.toFixed(8).replace(/\.?0+$/, '');

      setResult(formattedResult);
      addToHistory(input, formattedResult);
    } catch (err) {
      setError('Invalid expression');
      setResult(null);
    }
  };

  const addToHistory = (expression: string, result: string) => {
    const historyItem: CalculationHistory = {
      id: Date.now(),
      expression,
      result,
      timestamp: new Date(),
      category: mode
    };
    setHistory([historyItem, ...history]);
  };

  const clearInput = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <ToolLayout title="Math Calculator" description="Advanced mathematical calculations">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calculator */}
        <Card className="p-4 space-y-4 md:col-span-2">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Select value={mode} onValueChange={(value: 'basic' | 'scientific') => setMode(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="scientific">Scientific</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={clearInput}>
                Clear
              </Button>
            </div>

            <div className="space-y-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter expression"
                className="text-right text-lg font-mono"
              />
              {result && (
                <div className="text-right text-2xl font-mono font-bold">
                  = {result}
                </div>
              )}
              {error && (
                <div className="text-right text-red-500 text-sm">
                  {error}
                </div>
              )}
            </div>

            {mode === 'scientific' && (
              <div className="grid grid-cols-4 gap-2">
                {scientificOperations.map((op, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleButtonClick(op.symbol, op.type)}
                  >
                    {op.symbol}
                  </Button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-4 gap-2">
              {basicOperations.map((op, index) => (
                <Button
                  key={index}
                  variant={op.type === 'operator' ? 'secondary' : 'outline'}
                  onClick={() => handleButtonClick(op.symbol, op.type)}
                >
                  {op.symbol}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* History */}
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">History</h3>
            <Button variant="ghost" size="sm" onClick={clearHistory}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {history.map(item => (
              <div
                key={item.id}
                className="p-2 bg-secondary rounded-lg space-y-1"
              >
                <div className="flex justify-between items-start">
                  <div className="font-mono">
                    <div>{item.expression}</div>
                    <div className="font-bold">= {item.result}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {formatTimestamp(item.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(item.result)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {history.length === 0 && (
              <div className="text-center text-muted-foreground">
                <Calculator className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No calculations yet</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
} 