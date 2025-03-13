import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Calculator() {
  const [display, setDisplay] = React.useState("0");
  const [equation, setEquation] = React.useState("");
  const [shouldResetDisplay, setShouldResetDisplay] = React.useState(false);

  const handleNumber = (number: string) => {
    if (shouldResetDisplay) {
      setDisplay(number);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setShouldResetDisplay(true);
    setEquation(equation + display + operator);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleEquals = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation("");
      setShouldResetDisplay(true);
    } catch (error) {
      setDisplay("Error");
      setEquation("");
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setShouldResetDisplay(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  const buttons = [
    { label: "C", action: handleClear, className: "bg-red-500 hover:bg-red-600" },
    { label: "⌫", action: handleBackspace },
    { label: "%", action: handlePercentage },
    { label: "÷", action: () => handleOperator("/") },
    { label: "7", action: () => handleNumber("7") },
    { label: "8", action: () => handleNumber("8") },
    { label: "9", action: () => handleNumber("9") },
    { label: "×", action: () => handleOperator("*") },
    { label: "4", action: () => handleNumber("4") },
    { label: "5", action: () => handleNumber("5") },
    { label: "6", action: () => handleNumber("6") },
    { label: "-", action: () => handleOperator("-") },
    { label: "1", action: () => handleNumber("1") },
    { label: "2", action: () => handleNumber("2") },
    { label: "3", action: () => handleNumber("3") },
    { label: "+", action: () => handleOperator("+") },
    { label: "00", action: () => handleNumber("00") },
    { label: "0", action: () => handleNumber("0") },
    { label: ".", action: handleDecimal },
    { label: "=", action: handleEquals, className: "bg-blue-500 hover:bg-blue-600" },
  ];

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Calculator</h1>

        <div className="bg-secondary p-4 rounded-lg mb-4">
          <div className="text-sm text-muted-foreground text-right h-6">
            {equation}
          </div>
          <div className="text-3xl text-right font-medium truncate">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={button.action}
              className={`h-14 text-xl ${button.className || ""}`}
              variant={button.className ? "default" : "secondary"}
            >
              {button.label}
            </Button>
          ))}
        </div>

        <div className="mt-4 text-sm text-muted-foreground text-center">
          Tip: You can use your keyboard for input
        </div>
      </Card>
    </div>
  );
}
