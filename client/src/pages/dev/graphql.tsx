import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Play, Copy } from "lucide-react";

const DEFAULT_QUERY = `query {
  user(id: "1") {
    id
    name
    email
    posts {
      id
      title
    }
  }
}`;

const DEFAULT_VARIABLES = `{
  "id": "1"
}`;

export default function GraphqlPlayground() {
  const [url, setUrl] = useState("https://api.example.com/graphql");
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);
  const [headers, setHeaders] = useState("{}");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const executeQuery = async () => {
    if (!url) {
      toast({
        title: "URL is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const parsedHeaders = JSON.parse(headers);
      const parsedVariables = JSON.parse(variables);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaders,
        },
        body: JSON.stringify({
          query,
          variables: parsedVariables,
        }),
      });

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
      
      toast({
        title: "Query executed successfully",
        variant: "default",
      });
    } catch (error) {
      setResponse((error as Error).message);
      toast({
        title: "Query failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        variant: "default",
      });
    });
  };

  return (
    <ToolLayout
      title="GraphQL Playground"
      description="Test and debug GraphQL queries"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>GraphQL Endpoint</Label>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter GraphQL endpoint URL"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Query</Label>
                  <Textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter GraphQL query"
                    className="font-mono min-h-[300px]"
                  />
                </div>

                <Tabs defaultValue="variables" className="space-y-2">
                  <TabsList>
                    <TabsTrigger value="variables">Variables</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="variables">
                    <Textarea
                      value={variables}
                      onChange={(e) => setVariables(e.target.value)}
                      placeholder="Enter query variables (JSON)"
                      className="font-mono min-h-[300px]"
                    />
                  </TabsContent>
                  <TabsContent value="headers">
                    <Textarea
                      value={headers}
                      onChange={(e) => setHeaders(e.target.value)}
                      placeholder="Enter request headers (JSON)"
                      className="font-mono min-h-[300px]"
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <Button 
                onClick={executeQuery} 
                className="w-full"
                disabled={loading}
              >
                <Play className="w-4 h-4 mr-2" />
                Execute Query
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Response</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(response)}
                  disabled={!response}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg min-h-[300px]">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {response || "Response will appear here..."}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 