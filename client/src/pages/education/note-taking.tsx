import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Plus, Folder, File, Trash2, Edit2, Save } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  lastModified: Date;
  tags: string[];
}

export default function NoteTaking() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: [] as string[]
  });

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'study', label: 'Study' },
    { value: 'research', label: 'Research' },
    { value: 'project', label: 'Project' },
    { value: 'personal', label: 'Personal' }
  ];

  const addNote = () => {
    if (!newNote.title || !newNote.content) return;

    const note: Note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      lastModified: new Date(),
      tags: newNote.tags
    };

    setNotes([note, ...notes]);
    setNewNote({
      title: '',
      content: '',
      category: 'general',
      tags: []
    });
  };

  const updateNote = () => {
    if (!selectedNote) return;

    setNotes(notes.map(note =>
      note.id === selectedNote.id
        ? { ...selectedNote, lastModified: new Date() }
        : note
    ));
    setSelectedNote(null);
    setEditMode(false);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setEditMode(false);
    }
  };

  const startEdit = (note: Note) => {
    setSelectedNote(note);
    setEditMode(true);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getNotesByCategory = (category: string) => {
    return notes.filter(note => note.category === category);
  };

  return (
    <ToolLayout title="Note Taking" description="Take and organize your study notes">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <div className="space-y-4">
            <Input
              placeholder="Note title"
              value={editMode ? selectedNote?.title : newNote.title}
              onChange={(e) => editMode
                ? setSelectedNote({ ...selectedNote!, title: e.target.value })
                : setNewNote({ ...newNote, title: e.target.value })
              }
            />

            <Textarea
              placeholder="Note content"
              value={editMode ? selectedNote?.content : newNote.content}
              onChange={(e) => editMode
                ? setSelectedNote({ ...selectedNote!, content: e.target.value })
                : setNewNote({ ...newNote, content: e.target.value })
              }
              className="min-h-[200px]"
            />

            <Select
              value={editMode ? selectedNote?.category : newNote.category}
              onValueChange={(value) => editMode
                ? setSelectedNote({ ...selectedNote!, category: value })
                : setNewNote({ ...newNote, category: value })
              }
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

            <Button
              onClick={editMode ? updateNote : addNote}
              className="w-full"
            >
              {editMode ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Note
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">Your Notes</h3>
          <div className="space-y-6">
            {categories.map(category => {
              const categoryNotes = getNotesByCategory(category.value);
              if (categoryNotes.length === 0) return null;

              return (
                <div key={category.value} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-5 w-5" />
                    <h4 className="font-medium">{category.label}</h4>
                  </div>
                  <div className="space-y-2">
                    {categoryNotes.map(note => (
                      <div
                        key={note.id}
                        className="p-3 bg-secondary rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{note.title}</h5>
                            <p className="text-sm text-muted-foreground">
                              Last modified: {formatDate(note.lastModified)}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEdit(note)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNote(note.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {note.content && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {note.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {notes.length === 0 && (
              <div className="text-center text-muted-foreground">
                <p>No notes yet</p>
                <p className="text-sm">Create your first note to get started</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
} 