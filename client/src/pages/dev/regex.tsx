import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  const testRegex = (newPattern: string, newText: string) => {
    try {
      if (!newPattern) {
        setMatches([]);
        setIsValid(true);
        return;
      }
      const regex = new RegExp(newPattern, flags);
      const found = newText.match(regex) || [];
      setMatches(found);
      setIsValid(true);
    } catch (e) {
      setIsValid(false);
      setMatches([]);
    }
  };

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test and validate regular expressions with real-time matching."
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label htmlFor="pattern">Regular Expression</Label>
              <Input
                id="pattern"
                value={pattern}
                onChange={(e) => {
                  setPattern(e.target.value);
                  testRegex(e.target.value, text);
                }}
                className={!isValid ? "border-red-500" : ""}
                placeholder="Enter regex pattern..."
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={flags.includes('g')}
                  onCheckedChange={(checked) => {
                    const newFlags = checked
                      ? flags + 'g'
                      : flags.replace('g', '');
                    setFlags(newFlags);
                    testRegex(pattern, text);
                  }}
                />
                <Label>Global</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={flags.includes('i')}
                  onCheckedChange={(checked) => {
                    const newFlags = checked
                      ? flags + 'i'
                      : flags.replace('i', '');
                    setFlags(newFlags);
                    testRegex(pattern, text);
                  }}
                />
                <Label>Case Insensitive</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Card>
            <CardContent className="pt-6">
              <Label>Test Text</Label>
              <Textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  testRegex(pattern, e.target.value);
                }}
                placeholder="Enter text to test against..."
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>Matches ({matches.length})</Label>
              <div className="min-h-[200px] p-4 bg-muted rounded-md">
                {matches.length > 0 ? (
                  <ul className="space-y-2">
                    {matches.map((match, index) => (
                      <li key={index} className="font-mono">
                        {match}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No matches found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ToolLayout>
  );
}
