import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { Upload, Download, FileIcon, Image as ImageIcon, FileText, Music, Video, File } from 'lucide-react';

interface ConversionOption {
  from: string[];
  to: string[];
  icon: React.ReactNode;
  label: string;
}

const conversionOptions: { [key: string]: ConversionOption } = {
  image: {
    from: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'],
    to: ['.png', '.jpg', '.jpeg', '.webp'],
    icon: <ImageIcon className="w-4 h-4" />,
    label: 'Image'
  },
  document: {
    from: ['.doc', '.docx', '.pdf', '.txt', '.rtf'],
    to: ['.pdf', '.txt'],
    icon: <FileText className="w-4 h-4" />,
    label: 'Document'
  },
  audio: {
    from: ['.mp3', '.wav', '.ogg', '.m4a'],
    to: ['.mp3', '.wav', '.ogg'],
    icon: <Music className="w-4 h-4" />,
    label: 'Audio'
  },
  video: {
    from: ['.mp4', '.webm', '.avi', '.mov'],
    to: ['.mp4', '.webm'],
    icon: <Video className="w-4 h-4" />,
    label: 'Video'
  }
};

const FileConverter: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('');
  const [error, setError] = useState('');
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    const type = Object.entries(conversionOptions).find(([_, option]) => 
      option.from.includes(fileExt)
    )?.[0];

    if (!type) {
      setError('Unsupported file format');
      return;
    }

    setSelectedType(type);
    setSelectedFile(file);
    setTargetFormat('');
    setError('');
  };

  const handleConvert = async () => {
    if (!selectedFile || !targetFormat) {
      setError('Please select a file and target format');
      return;
    }

    setConverting(true);
    setError('');

    try {
      // Here you would typically send the file to a server for conversion
      // For now, we'll simulate the conversion with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulated download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(selectedFile);
      a.download = selectedFile.name.replace(/\.[^/.]+$/, '') + targetFormat;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  const getFileIcon = () => {
    if (!selectedType) return <File className="w-6 h-6" />;
    return conversionOptions[selectedType].icon;
  };

  return (
    <ToolLayout title="File Converter" description="Convert files between different formats">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* File Upload */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="space-y-2 text-center">
                <div
                  className="border-2 border-dashed rounded-lg p-8 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </div>
                    {selectedFile && (
                      <div className="flex items-center space-x-2 text-sm font-medium">
                        {getFileIcon()}
                        <span>{selectedFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept={Object.values(conversionOptions)
                    .flatMap(option => option.from)
                    .join(',')}
                />
              </div>
            </div>

            {selectedType && (
              <div className="space-y-2">
                <Label>Convert to</Label>
                <Select value={targetFormat} onValueChange={setTargetFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target format" />
                  </SelectTrigger>
                  <SelectContent>
                    {conversionOptions[selectedType].to.map(format => (
                      <SelectItem key={format} value={format}>
                        {format.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-md">
              {error}
            </div>
          )}

          {/* Convert Button */}
          {selectedFile && targetFormat && (
            <Button
              onClick={handleConvert}
              className="w-full"
              disabled={converting}
            >
              {converting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Converting...</span>
                </div>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Convert and Download
                </>
              )}
            </Button>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Supported Conversions:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {Object.entries(conversionOptions).map(([key, option]) => (
                <div key={key} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {option.icon}
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <div className="text-xs">
                    {option.from.join(', ')} → {option.to.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default FileConverter; 