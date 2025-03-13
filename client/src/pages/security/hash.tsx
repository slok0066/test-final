import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function SecurityHashGenerator() {
  const [input, setInput] = React.useState("");
  const [algorithm, setAlgorithm] = React.useState("md5");
  const [hash, setHash] = React.useState("");

  const handleGenerate = async () => {
    // In a real app, this would use a crypto library to generate actual hashes
    setHash("e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4"); // Example hash
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Hash Generator</h1>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Hash Algorithm
            </label>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="md5">MD5</SelectItem>
                <SelectItem value="sha1">SHA-1</SelectItem>
                <SelectItem value="sha256">SHA-256</SelectItem>
                <SelectItem value="sha512">SHA-512</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Input Text
            </label>
            <Textarea
              placeholder="Enter text to hash"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={handleGenerate} className="w-full">
            Generate Hash
          </Button>

          {hash && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Generated Hash
              </label>
              <div className="flex gap-2">
                <Input value={hash} readOnly />
                <Button
                  onClick={() => navigator.clipboard.writeText(hash)}
                  variant="outline"
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
