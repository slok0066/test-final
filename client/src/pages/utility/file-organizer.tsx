import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Folder, File, Trash2, Plus } from 'lucide-react';

interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  category: string;
}

const FileOrganizer: React.FC<RouteComponentProps> = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [newFile, setNewFile] = useState({
    name: '',
    type: '',
    size: '',
    category: 'documents'
  });

  const categories = [
    { value: 'documents', label: 'Documents' },
    { value: 'images', label: 'Images' },
    { value: 'videos', label: 'Videos' },
    { value: 'music', label: 'Music' },
    { value: 'archives', label: 'Archives' },
    { value: 'other', label: 'Other' }
  ];

  const addFile = () => {
    if (!newFile.name || !newFile.type) return;

    const file: FileItem = {
      id: Date.now(),
      name: newFile.name,
      type: newFile.type,
      size: newFile.size,
      lastModified: new Date().toLocaleDateString(),
      category: newFile.category
    };

    setFiles([...files, file]);
    setNewFile({
      name: '',
      type: '',
      size: '',
      category: 'documents'
    });
  };

  const removeFile = (id: number) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const getFilesByCategory = (category: string) => {
    return files.filter(file => file.category === category);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    if (type.includes('audio')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('zip') || type.includes('rar')) return '📦';
    return '📄';
  };

  return (
    <ToolLayout title="File Organizer" description="Organize and manage your files">
      <Card className="w-full max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>File Name</Label>
              <Input
                placeholder="Enter file name"
                value={newFile.name}
                onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>File Type</Label>
              <Input
                placeholder="e.g., .pdf, .jpg, .mp3"
                value={newFile.type}
                onChange={(e) => setNewFile({ ...newFile, type: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>File Size</Label>
              <Input
                placeholder="e.g., 1.5 MB"
                value={newFile.size}
                onChange={(e) => setNewFile({ ...newFile, size: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newFile.category}
                onValueChange={(value) => setNewFile({ ...newFile, category: value })}
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

          <Button onClick={addFile} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add File
          </Button>

          <div className="space-y-6">
            {categories.map(category => {
              const categoryFiles = getFilesByCategory(category.value);
              if (categoryFiles.length === 0) return null;

              return (
                <div key={category.value} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">{category.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {categoryFiles.map(file => (
                      <div
                        key={file.id}
                        className="p-4 bg-secondary rounded-lg flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{getFileIcon(file.type)}</span>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {file.type} • {file.size} • Modified: {file.lastModified}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {files.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>No files added yet</p>
              <p className="text-sm">Add files to start organizing</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default FileOrganizer; 