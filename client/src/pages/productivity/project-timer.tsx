import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Play, Pause, RotateCcw, Plus, Trash2, Clock } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  category: string;
  timeSpent: number;
  isRunning: boolean;
  lastStartTime?: number;
  sessions: {
    startTime: number;
    endTime: number;
    duration: number;
  }[];
}

const ProjectTimer: React.FC<RouteComponentProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    name: '',
    category: 'work'
  });

  const categories = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'study', label: 'Study' },
    { value: 'hobby', label: 'Hobby' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(prevProjects =>
        prevProjects.map(project => {
          if (project.isRunning && project.lastStartTime) {
            const currentTime = Date.now();
            const elapsedSeconds = Math.floor((currentTime - project.lastStartTime) / 1000);
            return { ...project, timeSpent: project.timeSpent + 1 };
          }
          return project;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addProject = () => {
    if (!newProject.name) return;

    const project: Project = {
      id: Date.now(),
      name: newProject.name,
      category: newProject.category,
      timeSpent: 0,
      isRunning: false,
      sessions: []
    };

    setProjects([...projects, project]);
    setNewProject({
      name: '',
      category: 'work'
    });
  };

  const toggleTimer = (id: number) => {
    const currentTime = Date.now();
    
    setProjects(projects.map(project => {
      if (project.id === id) {
        if (project.isRunning) {
          // Stopping the timer
          const session = {
            startTime: project.lastStartTime || currentTime,
            endTime: currentTime,
            duration: project.lastStartTime ? Math.floor((currentTime - project.lastStartTime) / 1000) : 0
          };
          return {
            ...project,
            isRunning: false,
            lastStartTime: undefined,
            sessions: [...project.sessions, session]
          };
        } else {
          // Starting the timer
          return {
            ...project,
            isRunning: true,
            lastStartTime: currentTime
          };
        }
      }
      return project;
    }));
  };

  const resetTimer = (id: number) => {
    setProjects(projects.map(project =>
      project.id === id ? {
        ...project,
        timeSpent: 0,
        isRunning: false,
        lastStartTime: undefined,
        sessions: []
      } : project
    ));
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalTimeByCategory = (category: string) => {
    return projects
      .filter(project => project.category === category)
      .reduce((total, project) => total + project.timeSpent, 0);
  };

  const getProjectsByCategory = (category: string) => {
    return projects.filter(project => project.category === category);
  };

  return (
    <ToolLayout title="Project Timer" description="Track time spent on different projects">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                placeholder="Enter project name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newProject.category}
                onValueChange={(value) => setNewProject({ ...newProject, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={addProject} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>

          <div className="space-y-6">
            {categories.map(category => {
              const categoryProjects = getProjectsByCategory(category.value);
              if (categoryProjects.length === 0) return null;

              return (
                <div key={category.value} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{category.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      Total: {formatTime(getTotalTimeByCategory(category.value))}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {categoryProjects.map(project => (
                      <Card key={project.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-2xl font-mono">
                              {formatTime(project.timeSpent)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Sessions: {project.sessions.length}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant={project.isRunning ? "outline" : "default"}
                              size="sm"
                              onClick={() => toggleTimer(project.id)}
                            >
                              {project.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => resetTimer(project.id)}
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeProject(project.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {projects.length === 0 && (
            <div className="text-center text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No projects added yet</p>
              <p className="text-sm">Add a project to start tracking time</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ProjectTimer; 