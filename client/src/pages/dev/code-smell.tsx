import React, { useState } from "react";
import { RouteComponentProps } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Check, X } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

interface CodeSmell {
  type: string;
  description: string;
  severity: "high" | "medium" | "low";
  line: number;
}

const CodeSmellDetector: React.FC<RouteComponentProps> = () => {
  const [code, setCode] = useState("");
  const [smells, setSmells] = useState<CodeSmell[]>([]);

  const analyzeCode = () => {
    const detectedSmells: CodeSmell[] = [];

    // Long functions (more than 20 lines)
    const lines = code.split("\n");
    if (lines.length > 20) {
      detectedSmells.push({
        type: "Long Function",
        description: "Function is too long (> 20 lines). Consider breaking it down.",
        severity: "medium",
        line: 1,
      });
    }

    // Nested conditionals
    const nestedIfCount = (code.match(/if.*{.*if/gs) || []).length;
    if (nestedIfCount > 0) {
      detectedSmells.push({
        type: "Nested Conditionals",
        description: "Contains nested if statements. Consider extracting conditions.",
        severity: "high",
        line: code.indexOf("if"),
      });
    }

    // Magic numbers
    const magicNumbers = code.match(/\b\d+\b/g);
    if (magicNumbers && magicNumbers.length > 0) {
      detectedSmells.push({
        type: "Magic Numbers",
        description: "Contains hardcoded numbers. Consider using named constants.",
        severity: "low",
        line: code.indexOf(magicNumbers[0]),
      });
    }

    // Long parameter list
    const longParams = code.match(/function.*\((.*)\)/);
    if (longParams && longParams[1].split(",").length > 3) {
      detectedSmells.push({
        type: "Long Parameter List",
        description: "Function has too many parameters. Consider using an object parameter.",
        severity: "medium",
        line: code.indexOf("function"),
      });
    }

    setSmells(detectedSmells);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "";
    }
  };

  return (
    <ToolLayout 
      title="Code Smell Detector" 
      description="Analyze code for common anti-patterns and complexity issues"
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Code Smell Detector</CardTitle>
          <CardDescription>
            Analyze your code for potential issues and anti-patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Textarea
                placeholder="Paste your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[200px] font-mono"
              />
              <Button onClick={analyzeCode}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Analyze Code
              </Button>
            </div>

            {smells.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Detected Issues</h3>
                <div className="grid gap-4">
                  {smells.map((smell, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold flex items-center">
                              <span className={getSeverityColor(smell.severity)}>
                                <AlertTriangle className="w-4 h-4 mr-2 inline" />
                              </span>
                              {smell.type}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {smell.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Line: {smell.line}
                            </p>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs ${getSeverityColor(smell.severity)}`}>
                            {smell.severity.toUpperCase()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default CodeSmellDetector; 