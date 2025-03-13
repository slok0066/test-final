import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Copy, FileSpreadsheet } from "lucide-react";
import * as XLSX from 'xlsx';

export default function ExcelToJson() {
  const [result, setResult] = useState("");
  const [fileName, setFileName] = useState("");
  const [prettify, setPrettify] = useState(true);
  const [headers, setHeaders] = useState(true);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
          header: headers ? undefined : 1,
          raw: false,
          defval: null,
        });

        const jsonString = prettify 
          ? JSON.stringify(jsonData, null, 2)
          : JSON.stringify(jsonData);

        setResult(jsonString);

        toast({
          title: "Excel file converted successfully",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Conversion failed",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied to clipboard",
        variant: "default",
      });
    });
  };

  const downloadJson = () => {
    const blob = new Blob([result], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace(/\.[^/.]+$/, "") + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Excel to JSON Converter"
      description="Convert Excel files to JSON format"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Upload Excel File</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx,.xls"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                  {fileName && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <FileSpreadsheet className="w-4 h-4 mr-1" />
                      {fileName}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={prettify}
                        onCheckedChange={setPrettify}
                        id="prettify"
                      />
                      <Label htmlFor="prettify">Prettify JSON</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={headers}
                        onCheckedChange={setHeaders}
                        id="headers"
                      />
                      <Label htmlFor="headers">Use headers</Label>
                    </div>
                  </div>
                </div>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <Label>Result</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={downloadJson}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg max-h-[600px] overflow-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {result}
                    </pre>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 