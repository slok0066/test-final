import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [dialect, setDialect] = useState("postgresql");

  const formatSQL = () => {
    // Here you would implement SQL formatting logic
    // You could use libraries like sql-formatter
    const formattedSQL = input.toUpperCase(); // Simple example
    setFormatted(formattedSQL);
  };

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Format and beautify SQL queries with syntax highlighting"
    >
      <div className="grid gap-6">
        <div className="flex items-center gap-4">
          <Select value={dialect} onValueChange={setDialect}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select dialect" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="postgresql">PostgreSQL</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
              <SelectItem value="sqlite">SQLite</SelectItem>
              <SelectItem value="mssql">SQL Server</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={formatSQL}>Format SQL</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input SQL</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your SQL query here..."
              className="h-[400px] font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Formatted SQL</label>
            <Textarea
              value={formatted}
              readOnly
              className="h-[400px] font-mono bg-muted"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
} 