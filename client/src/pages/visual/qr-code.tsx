import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCode() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Create QR codes for text, URLs, and more."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Input
              placeholder="Enter text or URL..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground text-center">
              Size: {size}px
            </p>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          {text ? (
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <QRCodeCanvas
                  value={text}
                  size={size}
                  level="H"
                  includeMargin
                  className="mx-auto"
                />
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-muted-foreground">
              Enter text above to generate a QR code
            </p>
          )}
        </motion.div>
      </div>
    </ToolLayout>
  );
}
