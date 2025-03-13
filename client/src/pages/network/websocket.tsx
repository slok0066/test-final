import { useState, useEffect, useRef } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

type ConnectionStatus = "disconnected" | "connecting" | "connected";

export default function WebSocketTester() {
  const [url, setUrl] = useState("ws://");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast();

  const connect = () => {
    if (!url) {
      toast({
        title: "URL is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setStatus("connecting");
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        setStatus("connected");
        addLog("Connected to server");
        toast({
          title: "Connected to WebSocket server",
          variant: "default",
        });
      };

      wsRef.current.onclose = () => {
        setStatus("disconnected");
        addLog("Disconnected from server");
      };

      wsRef.current.onerror = (error) => {
        setStatus("disconnected");
        addLog(`Error: ${error}`);
        toast({
          title: "WebSocket error",
          variant: "destructive",
        });
      };

      wsRef.current.onmessage = (event) => {
        addLog(`Received: ${event.data}`);
      };
    } catch (error) {
      setStatus("disconnected");
      toast({
        title: "Failed to connect",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const disconnect = () => {
    wsRef.current?.close();
    setStatus("disconnected");
  };

  const sendMessage = () => {
    if (!message) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
      addLog(`Sent: ${message}`);
      setMessage("");
    } else {
      toast({
        title: "Not connected",
        description: "Please connect to a WebSocket server first",
        variant: "destructive",
      });
    }
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <ToolLayout
      title="WebSocket Tester"
      description="Test WebSocket connections and send/receive messages"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>WebSocket URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="ws://localhost:8080"
                  />
                  <Button
                    onClick={status === "connected" ? disconnect : connect}
                    variant={status === "connected" ? "destructive" : "default"}
                  >
                    {status === "connected" ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    status === "connected"
                      ? "default"
                      : status === "connecting"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {status}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message to send"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={status !== "connected"}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Connection Log</Label>
                <Button
                  variant="outline"
                  onClick={() => setLogs([])}
                >
                  Clear
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg h-[400px] overflow-y-auto">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-sm mb-1"
                  >
                    {log}
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