import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";

type PaletteType = "monochromatic" | "analogous" | "complementary" | "triadic" | "tetradic";

// Color conversion utilities
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#4f46e5");
  const [paletteType, setPaletteType] = useState<PaletteType>("monochromatic");
  const [colors, setColors] = useState<string[]>([]);
  const { toast } = useToast();

  const generatePalette = () => {
    const hex = baseColor.replace("#", "");
    const rgb = {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16),
    };

    let newColors: string[] = [];

    switch (paletteType) {
      case "monochromatic":
        newColors = generateMonochromatic(rgb);
        break;
      case "analogous":
        newColors = generateAnalogous(rgb);
        break;
      case "complementary":
        newColors = generateComplementary(rgb);
        break;
      case "triadic":
        newColors = generateTriadic(rgb);
        break;
      case "tetradic":
        newColors = generateTetradic(rgb);
        break;
    }

    setColors(newColors);
  };

  const generateMonochromatic = (rgb: { r: number; g: number; b: number }) => {
    const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const newL = Math.max(0, Math.min(100, l - 30 + i * 15));
        const [r, g, b] = hslToRgb(h, s, newL);
        return rgbToHex(r, g, b);
      });
  };

  const generateAnalogous = (rgb: { r: number; g: number; b: number }) => {
    const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const newH = (h + (i - 2) * 30 + 360) % 360;
        const [r, g, b] = hslToRgb(newH, s, l);
        return rgbToHex(r, g, b);
      });
  };

  const generateComplementary = (rgb: { r: number; g: number; b: number }) => {
    const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const complement = (h + 180) % 360;
    return [
      rgbToHex(rgb.r, rgb.g, rgb.b),
      ...Array(4)
        .fill(0)
        .map((_, i) => {
          const [r, g, b] = hslToRgb(complement, s, Math.max(0, Math.min(100, l - 20 + i * 15)));
          return rgbToHex(r, g, b);
        }),
    ];
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      toast({
        title: "Color copied",
        description: `${color} copied to clipboard`,
        variant: "default",
      });
    });
  };

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Generate harmonious color palettes"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Base Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Palette Type</Label>
                <Select value={paletteType} onValueChange={(v) => setPaletteType(v as PaletteType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monochromatic">Monochromatic</SelectItem>
                    <SelectItem value="analogous">Analogous</SelectItem>
                    <SelectItem value="complementary">Complementary</SelectItem>
                    <SelectItem value="triadic">Triadic</SelectItem>
                    <SelectItem value="tetradic">Tetradic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={generatePalette} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Palette
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {colors.length > 0 && (
          <div className="grid gap-4 md:grid-cols-5">
            {colors.map((color, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="h-32 rounded-lg cursor-pointer relative group"
                  style={{ backgroundColor: color }}
                  onClick={() => copyColor(color)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                    <Copy className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-2 text-center font-mono text-sm">{color}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
} 