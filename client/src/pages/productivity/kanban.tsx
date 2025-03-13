import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { Textarea } from "@/components/ui/textarea";
import { Plus, Grip, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Task {
  id: string;
  title: string;
  description: string;
  labels: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inProgress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
  ]);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    labels: []
  });
  const [showNewTaskForm, setShowNewTaskForm] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<{ columnId: string; taskId: string } | null>(null);

  const addTask = (columnId: string) => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || '',
      labels: newTask.labels || []
    };

    setColumns(prev => prev.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, task]
        };
      }
      return column;
    }));

    setNewTask({
      title: '',
      description: '',
      labels: []
    });
    setShowNewTaskForm(null);
  };

  const updateTask = (columnId: string, taskId: string, updates: Partial<Task>) => {
    setColumns(prev => prev.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, ...updates };
            }
            return task;
          })
        };
      }
      return column;
    }));
    setEditingTask(null);
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns(prev => prev.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    }));
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // Same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Create new arrays
    const sourceTasks = Array.from(sourceColumn.tasks);
    const destTasks = source.droppableId === destination.droppableId
      ? sourceTasks
      : Array.from(destColumn.tasks);

    // Remove from source
    const [removed] = sourceTasks.splice(source.index, 1);

    // Insert into destination
    destTasks.splice(destination.index, 0, removed);

    // Update state
    setColumns(prev => prev.map(column => {
      if (column.id === source.droppableId) {
        return { ...column, tasks: sourceTasks };
      }
      if (column.id === destination.droppableId) {
        return { ...column, tasks: destTasks };
      }
      return column;
    }));
  };

  return (
    <ToolLayout title="Kanban Board" description="Organize tasks in kanban style">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1024px] p-6">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 gap-6">
              {columns.map(column => (
                <div key={column.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{column.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewTaskForm(column.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {showNewTaskForm === column.id && (
                    <Card className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          placeholder="Enter task title"
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Enter task description"
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowNewTaskForm(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => addTask(column.id)}>
                          Add Task
                        </Button>
                      </div>
                    </Card>
                  )}

                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-2 min-h-[200px]"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="p-4 space-y-2"
                              >
                                <div className="flex items-start justify-between">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="flex items-center gap-2"
                                  >
                                    <Grip className="h-4 w-4 text-muted-foreground" />
                                    {editingTask?.taskId === task.id ? (
                                      <Input
                                        value={task.title}
                                        onChange={(e) =>
                                          updateTask(column.id, task.id, {
                                            title: e.target.value,
                                          })
                                        }
                                        autoFocus
                                        onBlur={() => setEditingTask(null)}
                                      />
                                    ) : (
                                      <h4 className="font-medium">{task.title}</h4>
                                    )}
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          setEditingTask({
                                            columnId: column.id,
                                            taskId: task.id,
                                          })
                                        }
                                      >
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => deleteTask(column.id, task.id)}
                                        className="text-destructive"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                {task.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {task.description}
                                  </p>
                                )}
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </ToolLayout>
  );
} 