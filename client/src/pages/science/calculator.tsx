import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";

const BUTTONS = [
  ["sin", "cos", "tan", "(", ")", "C"],
  ["7", "8", "9", "/", "sqrt", "^"],
  ["4", "5", "6", "*", "log", "π"],
  ["1", "2", "3", "-", "e", "|"],
  ["0", ".", "=", "+", "!", "%"],
];

const evaluateExpression = (expr: string): string => {
  try {
    // Replace mathematical constants
    expr = expr.replace(/π/g, Math.PI.toString());
    expr = expr.replace(/e/g, Math.E.toString());

    // Handle basic mathematical functions
    expr = expr.replace(/sin\((.*?)\)/g, (_, p1) => Math.sin(parseFloat(p1)).toString());
    expr = expr.replace(/cos\((.*?)\)/g, (_, p1) => Math.cos(parseFloat(p1)).toString());
    expr = expr.replace(/tan\((.*?)\)/g, (_, p1) => Math.tan(parseFloat(p1)).toString());
    expr = expr.replace(/log\((.*?)\)/g, (_, p1) => Math.log(parseFloat(p1)).toString());
    expr = expr.replace(/sqrt\((.*?)\)/g, (_, p1) => Math.sqrt(parseFloat(p1)).toString());

    // Evaluate the expression
    return Function(`'use strict'; return (${expr})`)();
  } catch (err) {
    return "Error";
  }
};

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("");
  const [error, setError] = useState("");

  const handleClick = (value: string) => {
    setError("");
    
    if (value === "C") {
      setDisplay("");
    } else if (value === "=") {
      try {
        const result = evaluateExpression(display);
        if (result === "Error") {
          setError("Invalid expression");
        } else {
          setDisplay(result);
        }
      } catch (err) {
        setError("Invalid expression");
      }
    } else if (value === "π") {
      setDisplay(display + "π");
    } else if (value === "sqrt") {
      setDisplay(display + "sqrt(");
    } else if (["sin", "cos", "tan", "log"].includes(value)) {
      setDisplay(display + value + "(");
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <ToolLayout
      title="Scientific Calculator"
      description="Advanced calculator with scientific functions"
    >
      <div className="max-w-md mx-auto space-y-4">
        <div className="relative">
          <input
            type="text"
            value={display}
            readOnly
            className="w-full p-4 text-right text-2xl font-mono bg-muted rounded-lg"
          />
          {error && (
            <p className="absolute -bottom-6 right-0 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          {BUTTONS.map((row, i) => (
            <div key={i} className="grid grid-cols-6 gap-2">
              {row.map((btn) => (
                <Button
                  key={btn}
                  variant={
                    ["=", "C"].includes(btn) 
                      ? "default"
                      : ["sin", "cos", "tan", "log", "sqrt"].includes(btn)
                      ? "secondary"
                      : "outline"
                  }
                  className="h-12 text-lg font-medium md:h-14"
                  onClick={() => handleClick(btn)}
                >
                  {btn}
                </Button>
              ))}
            </div>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Tips:</p>
          <ul className="list-disc list-inside">
            <li>Use parentheses for complex expressions</li>
            <li>Scientific functions: sin, cos, tan, log, sqrt</li>
            <li>Constants: π (pi), e</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
