import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolLayout } from '@/components/tool-layout';
import { FileText, Fingerprint, Copy, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FileInfo {
  name: string;
  size: number;
  hash: string;
  lastModified: number;
}

export default function FileDNA() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const calculateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: FileInfo[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const hash = await calculateHash(file);
      newFiles.push({
        name: file.name,
        size: file.size,
        hash,
        lastModified: file.lastModified
      });
    }

    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard",
    });
  };

  const formatSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const findDuplicates = (): { [key: string]: FileInfo[] } => {
    const hashMap: { [key: string]: FileInfo[] } = {};
    files.forEach(file => {
      if (!hashMap[file.hash]) {
        hashMap[file.hash] = [];
      }
      hashMap[file.hash].push(file);
    });
    return Object.fromEntries(
      Object.entries(hashMap).filter(([_, files]) => files.length > 1)
    );
  };

  const duplicates = findDuplicates();

  return (
    <ToolLayout title="File DNA" description="Compare files using content fingerprinting">
      <Card className="w-full max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
          >
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drag and drop files here</p>
              <p className="text-sm text-muted-foreground">or</p>
              <Input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <Button asChild variant="outline">
                <Label htmlFor="file-upload">Choose Files</Label>
              </Button>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Files ({files.length})</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{file.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Size: {formatSize(file.size)} • Modified: {new Date(file.lastModified).toLocaleString()}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Fingerprint className="w-4 h-4 text-muted-foreground" />
                          <code className="text-xs">{file.hash}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyHash(file.hash)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Duplicates Section */}
          {Object.keys(duplicates).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-500">
                Duplicate Files Found
              </h3>
              {Object.entries(duplicates).map(([hash, dupeFiles]) => (
                <Card key={hash} className="p-4 border-yellow-500/50">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {dupeFiles.length} files with identical content:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {dupeFiles.map((file, i) => (
                        <li key={i} className="text-sm">
                          {file.name} ({formatSize(file.size)})
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
} 