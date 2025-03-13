import React, { useState } from "react";
import { RouteComponentProps } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Server, Copy, Play, Code } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

interface MockEndpoint {
  path: string;
  method: string;
  response: any;
}

const ApiMockGenerator: React.FC<RouteComponentProps> = () => {
  const [spec, setSpec] = useState("");
  const [endpoints, setEndpoints] = useState<MockEndpoint[]>([]);
  const [selectedFormat, setSelectedFormat] = useState("openapi");
  const [mockServer, setMockServer] = useState<string | null>(null);

  const generateMockServer = () => {
    try {
      let parsedSpec;
      if (selectedFormat === "openapi") {
        parsedSpec = JSON.parse(spec);
        // Basic OpenAPI parsing
        const paths = parsedSpec.paths || {};
        const newEndpoints: MockEndpoint[] = [];

        Object.entries(paths).forEach(([path, methods]: [string, any]) => {
          Object.entries(methods).forEach(([method, details]: [string, any]) => {
            const responses = details.responses || {};
            const successResponse = responses["200"] || responses["201"];
            
            if (successResponse && successResponse.content) {
              const example = successResponse.content["application/json"]?.example;
              if (example) {
                newEndpoints.push({
                  path,
                  method: method.toUpperCase(),
                  response: example,
                });
              }
            }
          });
        });

        setEndpoints(newEndpoints);
        setMockServer(`
// Mock Server Code (Express.js)
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

${newEndpoints
  .map(
    (endpoint) => `
app.${endpoint.method.toLowerCase()}('${endpoint.path}', (req, res) => {
  res.json(${JSON.stringify(endpoint.response, null, 2)});
});`
  )
  .join("\n")}

app.listen(port, () => {
  console.log(\`Mock server running at http://localhost:\${port}\`);
});`);
      }
    } catch (error) {
      alert("Error parsing specification: " + error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout 
      title="API Mock Generator" 
      description="Generate mock APIs from OpenAPI/Swagger specs with realistic data"
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>API Mock Generator</CardTitle>
          <CardDescription>
            Generate mock APIs from OpenAPI/Swagger specifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">API Specification</h3>
                <Select
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openapi">OpenAPI/Swagger</SelectItem>
                    <SelectItem value="raml">RAML</SelectItem>
                    <SelectItem value="graphql">GraphQL Schema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Paste your OpenAPI/Swagger specification here..."
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                className="min-h-[200px] font-mono"
              />
              <Button onClick={generateMockServer}>
                <Server className="w-4 h-4 mr-2" />
                Generate Mock Server
              </Button>
            </div>

            {endpoints.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Generated Endpoints</h3>
                <div className="grid gap-4">
                  {endpoints.map((endpoint, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold flex items-center">
                              <span className="text-blue-500 font-mono">
                                {endpoint.method}
                              </span>
                              <span className="ml-2 font-mono">
                                {endpoint.path}
                              </span>
                            </h4>
                            <pre className="mt-2 p-2 bg-muted rounded-md text-xs">
                              {JSON.stringify(endpoint.response, null, 2)}
                            </pre>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                JSON.stringify(endpoint.response, null, 2)
                              )
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {mockServer && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Mock Server Code</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(mockServer)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                <pre className="p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                  {mockServer}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default ApiMockGenerator; 