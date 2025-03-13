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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GitCommit, Copy, Wand2 } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

interface Suggestion {
  type: string;
  message: string;
}

const COMMIT_TYPES = [
  { value: "feat", label: "Features", description: "A new feature" },
  { value: "fix", label: "Bug Fixes", description: "A bug fix" },
  { value: "docs", label: "Documentation", description: "Documentation only changes" },
  { value: "style", label: "Styles", description: "Changes that do not affect the meaning of the code" },
  { value: "refactor", label: "Code Refactoring", description: "A code change that neither fixes a bug nor adds a feature" },
  { value: "perf", label: "Performance Improvements", description: "A code change that improves performance" },
  { value: "test", label: "Tests", description: "Adding missing tests or correcting existing tests" },
  { value: "build", label: "Builds", description: "Changes that affect the build system or external dependencies" },
  { value: "ci", label: "Continuous Integration", description: "Changes to CI configuration files and scripts" },
  { value: "chore", label: "Chores", description: "Other changes that don't modify src or test files" },
  { value: "revert", label: "Reverts", description: "Reverts a previous commit" },
];

const GitMessageBuilder: React.FC<RouteComponentProps> = () => {
  const [type, setType] = useState("");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const generateMessage = () => {
    const scopeText = scope ? `(${scope})` : "";
    const message = `${type}${scopeText}: ${description}

${body}`;
    return message.trim();
  };

  const generateSuggestions = () => {
    // In a real implementation, this would call an AI service
    // For now, we'll use some basic suggestions
    const newSuggestions: Suggestion[] = [
      {
        type: "feat",
        message: "Add new user authentication system",
      },
      {
        type: "fix",
        message: "Resolve memory leak in data processing",
      },
      {
        type: "refactor",
        message: "Simplify error handling logic",
      },
      {
        type: "perf",
        message: "Optimize database queries for better performance",
      },
    ];
    setSuggestions(newSuggestions);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const applySuggestion = (suggestion: Suggestion) => {
    setType(suggestion.type);
    setDescription(suggestion.message);
  };

  return (
    <ToolLayout 
      title="Git Message Builder" 
      description="Build semantic commit messages with AI suggestions"
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Git Message Builder</CardTitle>
          <CardDescription>
            Create semantic commit messages following conventional commits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMIT_TYPES.map((commitType) => (
                        <SelectItem
                          key={commitType.value}
                          value={commitType.value}
                        >
                          <div className="flex flex-col">
                            <span>{commitType.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {commitType.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scope (optional)</label>
                  <Input
                    placeholder="e.g., auth, api"
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Brief description of the change"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Body (optional)</label>
                <Textarea
                  placeholder="Detailed description of the changes"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => copyToClipboard(generateMessage())}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Message
                </Button>
                <Button onClick={generateSuggestions}>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Get AI Suggestions
                </Button>
              </div>
            </div>

            {suggestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Suggestions</h3>
                <div className="grid gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-blue-500">
                              {suggestion.type}:
                            </span>{" "}
                            <span className="text-sm">{suggestion.message}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => applySuggestion(suggestion)}
                          >
                            Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {type && description && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Preview</h3>
                <pre className="p-4 bg-muted rounded-lg text-sm font-mono">
                  {generateMessage()}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default GitMessageBuilder; 