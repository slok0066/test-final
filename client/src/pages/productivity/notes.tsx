import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  color: string;
}

const categories = ["Personal", "Work", "Shopping", "Ideas", "Other"];
const colors = [
  "bg-blue-100 dark:bg-blue-900",
  "bg-green-100 dark:bg-green-900",
  "bg-yellow-100 dark:bg-yellow-900",
  "bg-pink-100 dark:bg-pink-900",
  "bg-purple-100 dark:bg-purple-900",
];

export default function Notes() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState(colors[0]);

  const addNote = () => {
    if (!title.trim() || !content.trim() || !category) return;

    const note: Note = {
      id: Date.now().toString(),
      title,
      content,
      category,
      createdAt: new Date().toLocaleString(),
      color: selectedColor,
    };

    setNotes([note, ...notes]);
    setTitle("");
    setContent("");
    setCategory("");
    setSelectedColor(colors[0]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) => {
    const matchesFilter = filter === "all" || note.category === filter;
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Quick Notes</h1>

        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="min-h-[100px]"
            />

            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full ${color} ${
                      selectedColor === color ? "ring-2 ring-offset-2" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>

              <Button onClick={addNote} className="ml-auto">
                Add Note
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="flex-1"
            />

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter notes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className={`p-4 ${note.color} border-0`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{note.title}</h3>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{note.category}</span>
                      <span>•</span>
                      <span>{note.createdAt}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </Button>
                </div>
                <p className="whitespace-pre-wrap">{note.content}</p>
              </Card>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center text-muted-foreground p-4">
              {search
                ? "No notes match your search"
                : "No notes yet. Create your first note!"}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
