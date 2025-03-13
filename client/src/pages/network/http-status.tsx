import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

const HTTP_CODES = {
  // 1xx Informational
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",

  // 2xx Success
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "204": "No Content",
  "206": "Partial Content",

  // 3xx Redirection
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",

  // 4xx Client Errors
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "413": "Payload Too Large",
  "429": "Too Many Requests",

  // 5xx Server Errors
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported"
};

export default function HttpStatusCodes() {
  const [search, setSearch] = useState("");

  const filteredCodes = Object.entries(HTTP_CODES).filter(
    ([code, desc]) => 
      code.includes(search) || 
      desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ToolLayout
      title="HTTP Status Codes"
      description="Reference for common HTTP status codes and their meanings"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Search Status Codes</Label>
              <Input
                placeholder="Search by code or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid gap-4 pb-6">
            {filteredCodes.map(([code, desc], index) => (
              <motion.div
                key={code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-2xl font-bold">{code}</span>
                        <div className={`px-2 py-1 rounded text-xs ${
                          code.startsWith('2') ? 'bg-green-500/10 text-green-500' :
                          code.startsWith('3') ? 'bg-blue-500/10 text-blue-500' :
                          code.startsWith('4') ? 'bg-orange-500/10 text-orange-500' :
                          code.startsWith('5') ? 'bg-red-500/10 text-red-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {code.startsWith('2') ? 'Success' :
                           code.startsWith('3') ? 'Redirection' :
                           code.startsWith('4') ? 'Client Error' :
                           code.startsWith('5') ? 'Server Error' :
                           'Informational'}
                        </div>
                      </div>
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </ToolLayout>
  );
}