import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

const EXAMPLE_SVG = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`;

export default function SvgEditor() {
  const [svgCode, setSvgCode] = useState(EXAMPLE_SVG);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(svgCode);
    toast({
      title: "Copied to clipboard",
      description: "SVG code has been copied to your clipboard.",
    });
  };

  return (
    <ToolLayout
      title="SVG Editor"
      description="Create and edit SVG graphics with live preview."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <Card>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Enter SVG code here..."
              className="min-h-[400px] font-mono"
              value={svgCode}
              onChange={(e) => setSvgCode(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-square flex items-center justify-center bg-white rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: svgCode }} />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={copyToClipboard}
            className="w-full"
          >
            Copy SVG Code
          </Button>
        </div>
      </motion.div>
    </ToolLayout>
  );
}
