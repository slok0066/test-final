import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { RouteComponentProps } from 'wouter';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const freecurrencyapi = new Freecurrencyapi('fca_live_2KD2rvfhlnynmCSQOgoStRAaoY33CioGkzS2gcdu');

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

const CurrencyConverter: React.FC<RouteComponentProps> = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const convertCurrency = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const value = parseFloat(amount);
      
      if (isNaN(value)) {
        throw new Error('Please enter a valid number');
      }
      
      if (value < 0) {
        throw new Error('Amount cannot be negative');
      }

      if (fromCurrency === toCurrency) {
        setResult(value);
        setExchangeRate(1);
        return;
      }

      const response = await freecurrencyapi.latest({
        base_currency: fromCurrency,
        currencies: [toCurrency]
      });

      if (response && response.data && response.data[toCurrency]) {
        const rate = response.data[toCurrency];
        setExchangeRate(rate);
        setResult(value * rate);
      } else {
        throw new Error('Exchange rate not available');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate');
      setResult(null);
      setExchangeRate(null);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencySymbol = (code: string): string => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  // Auto-convert when inputs change
  useEffect(() => {
    if (amount) {
      const debounceTimer = setTimeout(() => {
        convertCurrency();
      }, 500); // Debounce API calls by 500ms

      return () => clearTimeout(debounceTimer);
    } else {
      setResult(null);
      setError(null);
      setExchangeRate(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <ToolLayout title="Currency Converter" description="Convert between different currencies">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {getCurrencySymbol(fromCurrency)}
                </span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>From Currency</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={swapCurrencies}
                className="rounded-full hover:bg-primary/10"
                disabled={loading}
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>To Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Fetching exchange rate...</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {result !== null && amount && !error && (
            <div className="p-4 bg-secondary rounded-lg text-center space-y-2">
              <p className="text-lg">
                {getCurrencySymbol(fromCurrency)}{parseFloat(amount).toFixed(2)} {fromCurrency} =
              </p>
              <p className="text-2xl font-bold">
                {getCurrencySymbol(toCurrency)}{result.toFixed(2)} {toCurrency}
              </p>
              {exchangeRate && (
                <p className="text-sm text-muted-foreground mt-2">
                  Exchange rate: 1 {fromCurrency} = {getCurrencySymbol(toCurrency)}{exchangeRate.toFixed(4)} {toCurrency}
                </p>
              )}
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>Exchange rates provided by Free Currency API</p>
            <p>Rates are updated in real-time</p>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default CurrencyConverter; 