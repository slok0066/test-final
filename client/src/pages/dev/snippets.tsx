import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

// This is a basic implementation. In a real app, we'd persist these to a database
const DEMO_SNIPPETS = [
  {
    id: 1,
    title: "React useState Example",
    code: "const [state, setState] = useState(initialState);"
  }
];

export default function SnippetManager() {
  const [snippets, setSnippets] = useState(DEMO_SNIPPETS);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");

  const addSnippet = () => {
    if (!title || !code) return;
    
    setSnippets([
      ...snippets,
      {
        id: snippets.length + 1,
        title,
        code
      }
    ]);
    
    setTitle("");
    setCode("");
  };

  return (
    <ToolLayout
      title="Code Snippet Manager"
      description="Store and organize your frequently used code snippets."
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label htmlFor="title">Snippet Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter snippet title..."
              />
            </div>
            
            <div>
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your code snippet..."
                className="font-mono min-h-[200px]"
              />
            </div>

            <Button onClick={addSnippet} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Snippet
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {snippets.map((snippet, index) => (
            <motion.div
              key={snippet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{snippet.title}</h3>
                  <pre className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    {snippet.code}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
