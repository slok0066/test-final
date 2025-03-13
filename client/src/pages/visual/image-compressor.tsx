import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import imageCompression from 'browser-image-compression';

interface ImageInfo {
  name: string;
  size: number;
  type: string;
  dimensions?: { width: number; height: number };
}

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | null>(null);
  const [compressedInfo, setCompressedInfo] = useState<ImageInfo | null>(null);
  const [quality, setQuality] = useState(80);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Get image dimensions
      const dimensions = await getImageDimensions(file);
      
      setOriginalImage(file);
      setOriginalInfo({
        name: file.name,
        size: file.size,
        type: file.type,
        dimensions,
      });
      
      // Reset compressed image when new image is uploaded
      setCompressedImage(null);
      setCompressedInfo(null);
    } catch (error) {
      toast({
        title: "Error loading image",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error("Failed to load image dimensions"));
      };
    });
  };

  const compressImage = async () => {
    if (!originalImage) return;

    try {
      setLoading(true);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: maintainRatio ? 1920 : undefined,
        useWebWorker: true,
        quality: quality / 100,
      };

      const compressedFile = await imageCompression(originalImage, options);
      const dimensions = await getImageDimensions(compressedFile);
      
      setCompressedImage(compressedFile);
      setCompressedInfo({
        name: compressedFile.name,
        size: compressedFile.size,
        type: compressedFile.type,
        dimensions,
      });

      toast({
        title: "Image compressed successfully",
        description: `Reduced from ${formatBytes(originalImage.size)} to ${formatBytes(compressedFile.size)}`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Compression failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const url = URL.createObjectURL(compressedImage);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${originalImage?.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress images without significant quality loss"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
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
                  {originalInfo && (
                    <div className="text-sm text-muted-foreground">
                      <p>Name: {originalInfo.name}</p>
                      <p>Size: {formatBytes(originalInfo.size)}</p>
                      <p>Type: {originalInfo.type}</p>
                      {originalInfo.dimensions && (
                        <p>Dimensions: {originalInfo.dimensions.width}x{originalInfo.dimensions.height}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Quality ({quality}%)</Label>
                    <Slider
                      value={[quality]}
                      onValueChange={([value]) => setQuality(value)}
                      min={1}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={maintainRatio}
                      onCheckedChange={setMaintainRatio}
                      id="maintain-ratio"
                    />
                    <Label htmlFor="maintain-ratio">Maintain aspect ratio</Label>
                  </div>

                  <Button
                    onClick={compressImage}
                    className="w-full"
                    disabled={!originalImage || loading}
                  >
                    {loading ? "Compressing..." : "Compress Image"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {compressedInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <Label>Compressed Image</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadImage}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    {compressedImage && (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                          src={URL.createObjectURL(compressedImage)}
                          alt="Compressed preview"
                          className="object-contain w-full h-full"
                        />
                      </div>
                    )}

                    <div className="text-sm text-muted-foreground">
                      <p>Size: {formatBytes(compressedInfo.size)}</p>
                      <p>Reduction: {((1 - compressedInfo.size / (originalInfo?.size || 1)) * 100).toFixed(1)}%</p>
                      {compressedInfo.dimensions && (
                        <p>Dimensions: {compressedInfo.dimensions.width}x{compressedInfo.dimensions.height}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 