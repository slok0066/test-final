import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Header {
  key: string;
  value: string;
}

export default function ApiClient() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendRequest = async () => {
    if (!url) {
      toast({
        title: "URL is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const requestHeaders = headers.reduce((acc, header) => {
        if (header.key && header.value) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {} as Record<string, string>);

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
        requestOptions.body = requestBody;
      }

      const response = await fetch(url, requestOptions);
      const data = await response.text();
      
      try {
        // Try to parse and format JSON response
        const jsonData = JSON.parse(data);
        setResponse(JSON.stringify(jsonData, null, 2));
      } catch {
        // If not JSON, show as plain text
        setResponse(data);
      }

      toast({
        title: `Request successful (${response.status})`,
        variant: "default",
      });
    } catch (error) {
      setResponse((error as Error).message);
      toast({
        title: "Request failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    setHeaders(headers.map((header, i) => 
      i === index ? { ...header, [field]: value } : header
    ));
  };

  return (
    <ToolLayout
      title="API Client"
      description="Test and debug API endpoints with a user-friendly interface"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-1">
                  <Label>Method</Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3">
                  <Label>URL</Label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.example.com/endpoint"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Headers</Label>
                  <Button variant="outline" onClick={addHeader}>
                    Add Header
                  </Button>
                </div>
                {headers.map((header, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-4 md:grid-cols-5"
                  >
                    <Input
                      className="md:col-span-2"
                      value={header.key}
                      onChange={(e) => updateHeader(index, 'key', e.target.value)}
                      placeholder="Header name"
                    />
                    <Input
                      className="md:col-span-2"
                      value={header.value}
                      onChange={(e) => updateHeader(index, 'value', e.target.value)}
                      placeholder="Header value"
                    />
                    <Button
                      variant="destructive"
                      onClick={() => removeHeader(index)}
                    >
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </div>

              {["POST", "PUT", "PATCH"].includes(method) && (
                <div className="space-y-2">
                  <Label>Request Body</Label>
                  <Textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    placeholder="Enter request body (JSON)"
                    className="font-mono min-h-[200px]"
                  />
                </div>
              )}

              <Button 
                onClick={sendRequest} 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Response</Label>
              <div className="p-4 bg-muted rounded-lg min-h-[400px]">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {response}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 