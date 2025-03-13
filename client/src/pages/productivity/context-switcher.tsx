import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layers, Plus, Save, Trash2 } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

interface Context {
  id: string;
  name: string;
  description: string;
  apps: string[];
  lastUsed: Date;
}

const ContextSwitcher: React.FC<RouteComponentProps> = () => {
  const [contexts, setContexts] = useState<Context[]>(() => {
    const saved = localStorage.getItem("contexts");
    return saved ? JSON.parse(saved) : [];
  });
  const [newContext, setNewContext] = useState({
    name: "",
    description: "",
  });
  const [activeContext, setActiveContext] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("contexts", JSON.stringify(contexts));
  }, [contexts]);

  const addContext = () => {
    if (!newContext.name) return;
    
    const context: Context = {
      id: Math.random().toString(36).substr(2, 9),
      name: newContext.name,
      description: newContext.description,
      apps: [],
      lastUsed: new Date(),
    };
    
    setContexts([...contexts, context]);
    setNewContext({ name: "", description: "" });
  };

  const removeContext = (id: string) => {
    setContexts(contexts.filter((c) => c.id !== id));
    if (activeContext === id) {
      setActiveContext(null);
    }
  };

  const switchContext = (id: string) => {
    const context = contexts.find((c) => c.id === id);
    if (!context) return;

    // Update last used timestamp
    setContexts(
      contexts.map((c) =>
        c.id === id ? { ...c, lastUsed: new Date() } : c
      )
    );
    
    setActiveContext(id);

    // Here you would implement the actual window management
    // For now, we'll just show a notification
    alert(`Switched to context: ${context.name}`);
  };

  return (
    <ToolLayout 
      title="Context Switcher" 
      description="Save and restore window layouts for different work contexts"
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Context Switcher</CardTitle>
          <CardDescription>
            Save and restore window layouts for different work contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Create New Context */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Create New Context</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Context Name"
                    value={newContext.name}
                    onChange={(e) =>
                      setNewContext({ ...newContext, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Description"
                    value={newContext.description}
                    onChange={(e) =>
                      setNewContext({ ...newContext, description: e.target.value })
                    }
                  />
                </div>
                <Button onClick={addContext}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Context
                </Button>
              </div>
            </div>

            {/* Saved Contexts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Saved Contexts</h3>
              <div className="grid gap-4">
                {contexts.map((context) => (
                  <Card key={context.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{context.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {context.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last used: {new Date(context.lastUsed).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => switchContext(context.id)}
                          >
                            <Layers className="w-4 h-4 mr-2" />
                            Switch
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContext(context.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default ContextSwitcher; 