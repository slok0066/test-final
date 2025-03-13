import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

export default function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState("");
  const [priority, setPriority] = React.useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      priority,
      dueDate: dueDate || undefined,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
    setDueDate("");
    setPriority("medium");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return todo.priority === filter;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed === b.completed) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">To-Do List</h1>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
            </div>
            <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-[150px]"
            />
            <Button onClick={addTodo}>Add</Button>
          </div>

          <div className="flex justify-between items-center">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter tasks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground">
              {todos.filter((todo) => !todo.completed).length} tasks remaining
            </div>
          </div>

          <div className="space-y-2">
            {sortedTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  todo.completed ? "bg-secondary opacity-60" : ""
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <div className="flex-1">
                    <p className={todo.completed ? "line-through" : ""}>
                      {todo.text}
                    </p>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span
                        className={`
                          ${todo.priority === "high" ? "text-red-500" : ""}
                          ${todo.priority === "medium" ? "text-yellow-500" : ""}
                          ${todo.priority === "low" ? "text-green-500" : ""}
                        `}
                      >
                        {todo.priority} priority
                      </span>
                      {todo.dueDate && (
                        <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <div className="text-center text-muted-foreground p-4">
              No tasks yet. Add some tasks to get started!
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
