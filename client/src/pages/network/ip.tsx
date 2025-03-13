import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IpTools() {
  const [ip, setIp] = React.useState("");
  const [results, setResults] = React.useState<any>(null);

  const handleLookup = async () => {
    // In a real app, this would make an API call to an IP geolocation service
    setResults({
      ip: ip,
      country: "United States",
      city: "San Francisco",
      isp: "Example ISP",
      timezone: "America/Los_Angeles",
      coordinates: "37.7749° N, 122.4194° W"
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">IP Tools</h1>
      <Tabs defaultValue="lookup">
        <TabsList>
          <TabsTrigger value="lookup">IP Lookup</TabsTrigger>
          <TabsTrigger value="myip">My IP</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lookup">
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter IP address"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
              />
              <Button onClick={handleLookup}>Lookup</Button>
            </div>

            {results && (
              <div className="space-y-4">
                {Object.entries(results).map(([key, value]) => (
                  <div key={key} className="flex gap-4">
                    <span className="font-semibold capitalize">{key}:</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="myip">
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your IP Address</h2>
              <p className="text-muted-foreground">127.0.0.1</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Note: This is a placeholder. In a real app, this would show your actual IP address.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
