import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from '@/components/tool-layout';
import { QRCodeSVG } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Download, Upload, Copy, Scan } from 'lucide-react';

const QRScanner: React.FC = () => {
  const [text, setText] = useState('');
  const [scannedResult, setScannedResult] = useState('');
  const [scannerStarted, setScannerStarted] = useState(false);
  const [error, setError] = useState('');
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const startScanner = () => {
    if (scannerStarted) return;

    try {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          setScannedResult(decodedText);
          if (scannerRef.current) {
            scannerRef.current.clear();
            setScannerStarted(false);
          }
        },
        (error) => {
          console.error(error);
        }
      );

      setScannerStarted(true);
      setError('');
    } catch (err) {
      setError('Failed to start scanner. Please ensure camera permissions are granted.');
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      setScannerStarted(false);
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout title="QR Code Scanner" description="Scan and generate QR codes">
      <Card className="w-full max-w-2xl mx-auto p-6">
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate QR Code</TabsTrigger>
            <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text or URL</Label>
                <Input
                  placeholder="Enter text or URL to encode..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              {text && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <QRCodeSVG
                      id="qr-code"
                      value={text}
                      size={200}
                      level="H"
                      includeMargin
                    />
                  </div>
                  <Button onClick={downloadQR}>
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="scan" className="space-y-6">
            <div className="space-y-4">
              {!scannerStarted ? (
                <Button onClick={startScanner} className="w-full">
                  <Scan className="w-4 h-4 mr-2" />
                  Start Scanner
                </Button>
              ) : (
                <Button onClick={stopScanner} variant="outline" className="w-full">
                  Stop Scanner
                </Button>
              )}

              <div id="qr-reader" className="w-full"></div>

              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-md">
                  {error}
                </div>
              )}

              {scannedResult && (
                <div className="space-y-2">
                  <Label>Scanned Result</Label>
                  <div className="relative">
                    <Input
                      value={scannedResult}
                      readOnly
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => copyToClipboard(scannedResult)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-sm text-muted-foreground mt-6">
          <p className="font-medium">Tips:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>For scanning, ensure good lighting and a steady camera</li>
            <li>QR codes can store text, URLs, contact info, and more</li>
            <li>Generated QR codes are downloaded as PNG files</li>
            <li>Camera permissions are required for scanning</li>
          </ul>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default QRScanner; 