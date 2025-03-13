import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Copy } from "lucide-react";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [angle, setAngle] = useState(45);
  const { toast } = useToast();

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
  };

  const gradientCSS = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS);
    toast({
      title: "Copied to clipboard",
      description: "CSS code has been copied to your clipboard.",
    });
  };

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      description="Create beautiful CSS gradients for your projects."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color1">Color 1</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="color1"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-[60px] p-1"
                  />
                  <Input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color2">Color 2</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="color2"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-[60px] p-1"
                  />
                  <Input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="angle">Angle: {angle}°</Label>
              <Input
                type="range"
                id="angle"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div
                className="h-40 rounded-lg transition-all"
                style={gradientStyle}
              />

              <div className="flex items-center gap-2">
                <code className="flex-1 p-4 bg-muted rounded-lg font-mono text-sm">
                  {gradientCSS}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ToolLayout>
  );
}
