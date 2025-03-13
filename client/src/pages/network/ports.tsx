import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface PortStatus {
  port: number;
  status: "open" | "closed" | "checking";
}

export default function PortScanner() {
  const [host, setHost] = useState("");
  const [portRange, setPortRange] = useState("80,443,3000-3010");
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<PortStatus[]>([]);
  const { toast } = useToast();

  const parsePortRange = (range: string): number[] => {
    const ports: number[] = [];
    const ranges = range.split(",").map(r => r.trim());
    
    ranges.forEach(range => {
      if (range.includes("-")) {
        const [start, end] = range.split("-").map(Number);
        for (let i = start; i <= end; i++) {
          ports.push(i);
        }
      } else {
        ports.push(Number(range));
      }
    });

    return ports.filter(p => !isNaN(p) && p > 0 && p < 65536);
  };

  const scanPorts = async () => {
    if (!host) {
      toast({
        title: "Host is required",
        variant: "destructive",
      });
      return;
    }

    const ports = parsePortRange(portRange);
    if (ports.length === 0) {
      toast({
        title: "Invalid port range",
        description: "Please enter valid port numbers (1-65535)",
        variant: "destructive",
      });
      return;
    }

    setScanning(true);
    setResults(ports.map(port => ({ port, status: "checking" })));

    try {
      // In a real implementation, you would need a backend service
      // to perform the actual port scanning
      await Promise.all(ports.map(async (port) => {
        // Simulate port checking
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));
        
        setResults(prev => 
          prev.map(r => 
            r.port === port 
              ? { ...r, status: Math.random() > 0.7 ? "open" : "closed" }
              : r
          )
        );
      }));

      toast({
        title: "Scan completed",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Scan failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  return (
    <ToolLayout
      title="Port Scanner"
      description="Scan for open ports on a host"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label>Host</Label>
              <Input
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="Enter hostname or IP (e.g., localhost)"
              />
            </div>

            <div className="space-y-2">
              <Label>Ports</Label>
              <Input
                value={portRange}
                onChange={(e) => setPortRange(e.target.value)}
                placeholder="e.g., 80,443,3000-3010"
              />
              <p className="text-sm text-muted-foreground">
                Enter individual ports separated by commas or port ranges using hyphens
              </p>
            </div>

            <Button
              onClick={scanPorts}
              disabled={scanning}
              className="w-full"
            >
              {scanning ? "Scanning..." : "Start Scan"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Results</Label>
              <div className="space-y-2">
                {results.map(({ port, status }) => (
                  <motion.div
                    key={port}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-2 bg-muted rounded"
                  >
                    <span className="font-mono">Port {port}</span>
                    <Badge
                      variant={
                        status === "open"
                          ? "default"
                          : status === "checking"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 