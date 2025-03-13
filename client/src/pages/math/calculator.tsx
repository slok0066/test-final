import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const { toast } = useToast();

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === "0" ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation("");
      toast({
        title: "Calculation complete",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Invalid calculation",
        description: "Please check your input",
        variant: "destructive",
      });
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  return (
    <ToolLayout
      title="Basic Calculator"
      description="Simple arithmetic calculator for basic calculations"
    >
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">{equation}</div>
                <div className="text-3xl font-mono">{display}</div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleNumber("7")}
                >7</Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumber("8")}
                >8</Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumber("9")}
                >9</Button>
                <Button
                  onClick={() => handleOperator("/")}
                >/</Button>

                <Button
                  variant="outline"
                  onClick={() => handleNumber("4")}
                >4</Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumber("5")}
                >5</Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumber("6")}
                >6</Button>
                <Button
                  onClick={() => handleOperator("*")}
                >×</Button>

                <Button
                  variant="outline"
                  onClick={() => handleNumber("1")}
                >1</Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumber("2")}
                >2</Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumber("3")}
                >3</Button>
                <Button
                  onClick={() => handleOperator("-")}
                >-</Button>

                <Button
                  variant="outline"
                  onClick={() => handleNumber("0")}
                >0</Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumber(".")}
                >.</Button>
                <Button
                  onClick={calculate}
                  className="bg-primary"
                >=</Button>
                <Button
                  onClick={() => handleOperator("+")}
                >+</Button>

                <Button
                  variant="destructive"
                  className="col-span-4"
                  onClick={clear}
                >Clear</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
