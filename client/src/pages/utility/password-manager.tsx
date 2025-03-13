import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Eye, EyeOff, Plus, Trash2, Copy, Lock, Key } from 'lucide-react';

interface PasswordEntry {
  id: number;
  title: string;
  username: string;
  password: string;
  category: string;
  website?: string;
  notes?: string;
}

const PasswordManager: React.FC<RouteComponentProps> = () => {
  const [entries, setEntries] = useState<PasswordEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    username: '',
    password: '',
    category: 'personal',
    website: '',
    notes: ''
  });
  const [showPasswords, setShowPasswords] = useState<{ [key: number]: boolean }>({});

  const categories = [
    { value: 'personal', label: 'Personal' },
    { value: 'work', label: 'Work' },
    { value: 'social', label: 'Social Media' },
    { value: 'finance', label: 'Financial' },
    { value: 'other', label: 'Other' }
  ];

  const addEntry = () => {
    if (!newEntry.title || !newEntry.username || !newEntry.password) return;

    const entry: PasswordEntry = {
      id: Date.now(),
      title: newEntry.title,
      username: newEntry.username,
      password: newEntry.password,
      category: newEntry.category,
      website: newEntry.website,
      notes: newEntry.notes
    };

    setEntries([...entries, entry]);
    setNewEntry({
      title: '',
      username: '',
      password: '',
      category: 'personal',
      website: '',
      notes: ''
    });
  };

  const removeEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getEntriesByCategory = (category: string) => {
    return entries.filter(entry => entry.category === category);
  };

  const maskPassword = (password: string) => {
    return '•'.repeat(password.length);
  };

  return (
    <ToolLayout title="Password Manager" description="Store and manage your passwords securely">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Enter title"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Username/Email</Label>
              <Input
                placeholder="Enter username or email"
                value={newEntry.username}
                onChange={(e) => setNewEntry({ ...newEntry, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={newEntry.password}
                onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newEntry.category}
                onValueChange={(value) => setNewEntry({ ...newEntry, category: value })}
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
            <div className="space-y-2">
              <Label>Website (optional)</Label>
              <Input
                placeholder="Enter website URL"
                value={newEntry.website}
                onChange={(e) => setNewEntry({ ...newEntry, website: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Input
                placeholder="Add notes"
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addEntry} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>

          <div className="space-y-6">
            {categories.map(category => {
              const categoryEntries = getEntriesByCategory(category.value);
              if (categoryEntries.length === 0) return null;

              return (
                <div key={category.value} className="space-y-2">
                  <h3 className="text-lg font-semibold">{category.label}</h3>
                  <div className="space-y-2">
                    {categoryEntries.map(entry => (
                      <Card key={entry.id} className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{entry.title}</h4>
                              {entry.website && (
                                <a
                                  href={entry.website.startsWith('http') ? entry.website : `https://${entry.website}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-500 hover:underline"
                                >
                                  {entry.website}
                                </a>
                              )}
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeEntry(entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center justify-between space-x-2 bg-secondary p-2 rounded">
                              <span className="text-sm">Username:</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{entry.username}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(entry.username)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between space-x-2 bg-secondary p-2 rounded">
                              <span className="text-sm">Password:</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  {showPasswords[entry.id] ? entry.password : maskPassword(entry.password)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => togglePasswordVisibility(entry.id)}
                                >
                                  {showPasswords[entry.id] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(entry.password)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {entry.notes && (
                            <p className="text-sm text-muted-foreground">{entry.notes}</p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {entries.length === 0 && (
            <div className="text-center text-muted-foreground">
              <Lock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No passwords stored yet</p>
              <p className="text-sm">Add an entry to start managing your passwords</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default PasswordManager; 