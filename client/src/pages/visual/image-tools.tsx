import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Upload, Download } from "lucide-react";

export default function ImageTools() {
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    if (imageBase64) {
      const link = document.createElement('a');
      link.href = imageBase64;
      link.download = imageFile?.name || 'image';
      link.click();
    }
  };

  return (
    <ToolLayout
      title="Image Tools"
      description="Convert images to Base64 and back, perfect for embedding images in your code."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode Image</TabsTrigger>
            <TabsTrigger value="decode">View Base64</TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card>
              <CardContent className="pt-6">
                <TabsContent value="encode">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-input"
                      />
                      <label htmlFor="image-input">
                        <Button variant="outline" className="mx-auto">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Image
                        </Button>
                      </label>
                      <p className="text-sm text-muted-foreground mt-2">
                        Supported formats: PNG, JPG, GIF
                      </p>
                    </div>

                    {imageBase64 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                          <img
                            src={imageBase64}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        </div>
                        <Button onClick={downloadImage} className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download Image
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="decode">
                  <div className="space-y-4">
                    {imageBase64 ? (
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-mono text-sm break-all">
                          {imageBase64}
                        </p>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        Upload an image to see its Base64 representation
                      </p>
                    )}
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </motion.div>
        </Tabs>
      </div>
    </ToolLayout>
  );
}
