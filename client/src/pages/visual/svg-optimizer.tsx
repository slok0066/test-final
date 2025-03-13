import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Upload, Code } from "lucide-react";
import { optimize } from 'svgo';

interface OptimizationOptions {
  removeComments: boolean;
  removeMetadata: boolean;
  removeEmptyAttrs: boolean;
  removeEmptyText: boolean;
  removeEmptyContainers: boolean;
  removeUnusedNS: boolean;
  removeTitle: boolean;
  removeDesc: boolean;
  removeDimensions: boolean;
  convertColors: boolean;
  cleanupIDs: boolean;
}

export default function SvgOptimizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState<OptimizationOptions>({
    removeComments: true,
    removeMetadata: true,
    removeEmptyAttrs: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    removeUnusedNS: true,
    removeTitle: false,
    removeDesc: false,
    removeDimensions: false,
    convertColors: true,
    cleanupIDs: true,
  });
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setInput(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  const optimizeSvg = () => {
    try {
      if (!input) {
        throw new Error("Please enter SVG code to optimize");
      }

      const result = optimize(input, {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeComments: options.removeComments,
                removeMetadata: options.removeMetadata,
                removeEmptyAttrs: options.removeEmptyAttrs,
                removeEmptyText: options.removeEmptyText,
                removeEmptyContainers: options.removeEmptyContainers,
                removeUnusedNS: options.removeUnusedNS,
                removeTitle: options.removeTitle,
                removeDesc: options.removeDesc,
                removeDimensions: options.removeDimensions,
                convertColors: options.convertColors,
                cleanupIDs: options.cleanupIDs,
              },
            },
          },
        ],
      });

      setOutput(result.data);

      const savings = ((input.length - result.data.length) / input.length * 100).toFixed(1);
      toast({
        title: "SVG optimized successfully",
        description: `Reduced by ${savings}%`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      toast({
        title: "Copied to clipboard",
        variant: "default",
      });
    });
  };

  const downloadSvg = () => {
    const blob = new Blob([output], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleOption = (key: keyof OptimizationOptions) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ToolLayout
      title="SVG Optimizer"
      description="Optimize and clean SVG files"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Input SVG</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload SVG
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".svg"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your SVG code here..."
                className="font-mono min-h-[300px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(options) as Array<keyof OptimizationOptions>).map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  <Switch
                    checked={options[key]}
                    onCheckedChange={() => toggleOption(key)}
                    id={key}
                  />
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </Label>
                </div>
              ))}
            </div>

            <Button onClick={optimizeSvg} className="w-full">
              Optimize SVG
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <Label>Optimized SVG</Label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={downloadSvg}
                  disabled={!output}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {output && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 bg-muted rounded-lg aspect-square flex items-center justify-center">
                  <div
                    dangerouslySetInnerHTML={{ __html: output }}
                    className="w-full h-full"
                  />
                </div>

                <Textarea
                  value={output}
                  readOnly
                  className="font-mono min-h-[200px]"
                />

                <div className="text-sm text-muted-foreground">
                  <p>Original size: {input.length} bytes</p>
                  <p>Optimized size: {output.length} bytes</p>
                  <p>Reduction: {((input.length - output.length) / input.length * 100).toFixed(1)}%</p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 