import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DnsLookup() {
  const [domain, setDomain] = React.useState("");
  const [results, setResults] = React.useState<any>(null);

  const handleLookup = async () => {
    // In a real app, this would make an API call to a DNS lookup service
    setResults({
      A: ["192.168.1.1"],
      AAAA: ["2001:db8::1"],
      MX: ["mail.example.com"],
      NS: ["ns1.example.com", "ns2.example.com"],
      TXT: ["v=spf1 include:_spf.example.com ~all"]
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">DNS Lookup</h1>
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Enter domain name (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <Button onClick={handleLookup}>Lookup</Button>
        </div>

        {results && (
          <div className="space-y-4">
            {Object.entries(results).map(([recordType, records]) => (
              <div key={recordType}>
                <h3 className="font-semibold mb-2">{recordType} Records</h3>
                <ul className="list-disc list-inside">
                  {Array.isArray(records) && records.map((record, index) => (
                    <li key={index} className="text-muted-foreground">{record}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
