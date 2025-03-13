import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ColorPicker() {
  const [color, setColor] = useState("#6366f1");
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${text} has been copied to your clipboard.`,
    });
  };

  const saveColor = () => {
    if (!savedColors.includes(color)) {
      setSavedColors([...savedColors, color]);
      toast({
        title: "Color saved",
        description: `${color} has been added to your palette.`,
      });
    }
  };

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick, convert and generate color palettes for your projects."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="color">Select Color</Label>
                <div className="flex gap-4">
                  <Input
                    type="color"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-[42px] w-[100px]"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>

              <div>
                <Label>Preview</Label>
                <div
                  className="h-32 rounded-lg transition-colors"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>

            <Button onClick={saveColor} className="w-full">Save to Palette</Button>
          </CardContent>
        </Card>

        {savedColors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <Label>Saved Colors</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {savedColors.map((savedColor, index) => (
                    <motion.div
                      key={savedColor}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className="h-20 rounded-lg mb-2"
                        style={{ backgroundColor: savedColor }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full font-mono"
                        onClick={() => copyToClipboard(savedColor)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {savedColor}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  );
}
