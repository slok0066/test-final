import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface ApiStatus {
  url: string;
  status: number | null;
  responseTime: number | null;
  loading: boolean;
  error?: string;
}

export default function ApiStatus() {
  const [apis, setApis] = useState<ApiStatus[]>([
    { url: "", status: null, responseTime: null, loading: false }
  ]);

  const checkStatus = async (index: number) => {
    const api = apis[index];
    if (!api.url) return;

    setApis(current =>
      current.map((item, i) =>
        i === index ? { ...item, loading: true, error: undefined } : item
      )
    );

    try {
      const startTime = performance.now();
      const response = await fetch(api.url);
      const endTime = performance.now();

      setApis(current =>
        current.map((item, i) =>
          i === index
            ? {
                ...item,
                status: response.status,
                responseTime: Math.round(endTime - startTime),
                loading: false
              }
            : item
        )
    );
    } catch (error) {
      setApis(current =>
        current.map((item, i) =>
          i === index
            ? {
                ...item,
                status: null,
                responseTime: null,
                loading: false,
                error: (error as Error).message
              }
            : item
        )
      );
    }
  };

  const addNewApi = () => {
    setApis(current => [
      ...current,
      { url: "", status: null, responseTime: null, loading: false }
    ]);
  };

  const removeApi = (index: number) => {
    setApis(current => current.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, url: string) => {
    setApis(current =>
      current.map((item, i) =>
        i === index ? { ...item, url } : item
      )
    );
  };

  return (
    <ToolLayout
      title="API Status Checker"
      description="Check the status and response time of multiple API endpoints"
    >
      <div className="space-y-4">
        {apis.map((api, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Enter API URL"
                    value={api.url}
                    onChange={(e) => updateUrl(index, e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => checkStatus(index)}
                      disabled={api.loading || !api.url}
                    >
                      {api.loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Check Status
                    </Button>
                    {apis.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => removeApi(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                {(api.status || api.error) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex items-center gap-4"
                  >
                    {api.status && (
                      <>
                        <Badge
                          variant={api.status < 400 ? "default" : "destructive"}
                        >
                          Status: {api.status}
                        </Badge>
                        <Badge variant="secondary">
                          Response Time: {api.responseTime}ms
                        </Badge>
                      </>
                    )}
                    {api.error && (
                      <Badge variant="destructive">
                        Error: {api.error}
                      </Badge>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <Button onClick={addNewApi} variant="outline" className="w-full">
          Add Another API
        </Button>
      </div>
    </ToolLayout>
  );
} 