import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Shuffle, Plus, X, Copy } from 'lucide-react';
import { generateDecision } from '@/lib/gemini-api';
import { useToast } from '@/components/ui/use-toast';

export default function DecisionMaker() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [decision, setDecision] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const generateNewDecision = async () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive"
      });
      return;
    }

    const validOptions = options.filter(opt => opt.trim());
    if (validOptions.length < 2) {
      toast({
        title: "Error",
        description: "Please enter at least two options",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateDecision(question, validOptions);
      setDecision(result.decision);
      setExplanation(result.explanation);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate decision. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = `Question: ${question}\nOptions: ${options.join(', ')}\nDecision: ${decision}\nExplanation: ${explanation}`;
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied!",
      description: "Decision copied to clipboard",
    });
  };

  return (
    <ToolLayout title="Random Decision Maker" description="Let AI decide your fate with a touch of humor">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Your Question</Label>
            <Input
              placeholder="What should I do?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Options</Label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                />
                {options.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addOption}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>

          <Button
            onClick={generateNewDecision}
            disabled={isGenerating}
            className="w-full"
          >
            <Shuffle className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Consulting the AI Oracle...' : 'Make a Decision'}
          </Button>

          {decision && (
            <div className="space-y-4">
              <div className="p-6 bg-primary/10 rounded-lg relative">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Decision:</h3>
                    <p className="mt-1">{decision}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Explanation:</h3>
                    <p className="mt-1">{explanation}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Disclaimer:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>AI decisions may be surprisingly insightful (or hilariously random)</li>
              <li>Not recommended for life-changing choices</li>
              <li>The AI takes no responsibility for the consequences</li>
              <li>Results guaranteed to be more fun than flipping a coin</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
} 