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
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Header {
  key: string;
  value: string;
}

export default function CurlBuilder() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [body, setBody] = useState("");
  const { toast } = useToast();

  const buildCurl = () => {
    let curl = `curl -X ${method} "${url}"`;
    
    // Add headers
    headers.forEach(header => {
      if (header.key && header.value) {
        curl += ` \\\n  -H "${header.key}: ${header.value}"`;
      }
    });

    // Add body for POST/PUT/PATCH
    if (["POST", "PUT", "PATCH"].includes(method) && body) {
      curl += ` \\\n  -d '${body}'`;
    }

    return curl;
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(buildCurl()).then(() => {
      toast({
        title: "Copied to clipboard",
        variant: "default",
      });
    });
  };

  return (
    <ToolLayout
      title="cURL Command Builder"
      description="Build and format cURL commands with a user-friendly interface"
    >
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
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter request body (JSON)"
                  className="font-mono"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <Label>Generated cURL Command</Label>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <pre className="p-4 bg-muted rounded-lg overflow-x-auto whitespace-pre-wrap">
              {buildCurl()}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 