import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

interface FaviconSize {
  size: number;
  label: string;
  checked: boolean;
}

export default function FaviconGenerator() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState<FaviconSize[]>([
    { size: 16, label: "16x16", checked: true },
    { size: 32, label: "32x32", checked: true },
    { size: 48, label: "48x48", checked: true },
    { size: 64, label: "64x64", checked: false },
    { size: 128, label: "128x128", checked: false },
    { size: 256, label: "256x256", checked: false },
  ]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setOriginalImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateFavicons = async () => {
    if (!originalImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const selectedSizes = sizes.filter(s => s.checked);
      
      if (selectedSizes.length === 0) {
        throw new Error("Please select at least one size");
      }

      // Create a zip file containing all favicon sizes
      const zip = new JSZip();
      const promises = selectedSizes.map(async ({ size }) => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) throw new Error("Canvas context not supported");

        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imagePreview;
        });

        ctx.drawImage(img, 0, 0, size, size);
        
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png');
        });

        zip.file(`favicon-${size}x${size}.png`, blob);
      });

      await Promise.all(promises);
      
      // Generate ICO file for 16x16 and 32x32
      if (sizes[0].checked || sizes[1].checked) {
        // Add ICO generation logic here if needed
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'favicons.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Favicons generated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSize = (index: number) => {
    setSizes(prev => prev.map((size, i) => 
      i === index ? { ...size, checked: !size.checked } : size
    ));
  };

  return (
    <ToolLayout
      title="Favicon Generator"
      description="Generate favicons in multiple sizes"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={imagePreview}
                    alt="Original"
                    className="object-contain w-full h-full"
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              <Label>Select Sizes</Label>
              <div className="grid grid-cols-2 gap-4">
                {sizes.map((size, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Switch
                      checked={size.checked}
                      onCheckedChange={() => toggleSize(index)}
                      id={`size-${size.size}`}
                    />
                    <Label htmlFor={`size-${size.size}`}>{size.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={generateFavicons}
              className="w-full"
              disabled={!originalImage || loading}
            >
              {loading ? "Generating..." : "Generate Favicons"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <Label>Preview</Label>
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-4"
              >
                {sizes.filter(s => s.checked).map((size, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={imagePreview}
                        alt={`${size.size}x${size.size}`}
                        className="object-contain w-full h-full"
                        style={{ width: size.size, height: size.size }}
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      {size.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 