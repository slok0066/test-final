import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HttpHeaders() {
  const [url, setUrl] = React.useState("");
  const [headers, setHeaders] = React.useState<any>(null);

  const handleCheck = async () => {
    // In a real app, this would make an API call to check headers
    setHeaders({
      "content-type": "text/html; charset=utf-8",
      "server": "nginx",
      "strict-transport-security": "max-age=31536000",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
      "x-xss-protection": "1; mode=block"
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">HTTP Headers Checker</h1>
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Enter URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleCheck}>Check Headers</Button>
        </div>

        {headers && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">Response Headers</h3>
            {Object.entries(headers).map(([header, value]) => (
              <div key={header} className="flex flex-col gap-1 border-b pb-2">
                <span className="font-medium">{header}</span>
                <span className="text-sm text-muted-foreground">{String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
