import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JwtParts {
  header: any;
  payload: any;
  signature: string;
}

export default function JwtDebugger() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<JwtParts | null>(null);
  const { toast } = useToast();

  const decodeToken = () => {
    try {
      if (!token.trim()) {
        throw new Error("Please enter a JWT token");
      }

      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const decoded: JwtParts = {
        header: JSON.parse(atob(parts[0])),
        payload: JSON.parse(atob(parts[1])),
        signature: parts[2]
      };

      setDecoded(decoded);
      toast({
        title: "Token decoded successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Decoding failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="JWT Debugger"
      description="Debug and verify JWT tokens with detailed information"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label>JWT Token</Label>
              <Textarea
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your JWT token here"
                className="font-mono min-h-[100px]"
              />
            </div>

            <Button onClick={decodeToken} className="w-full">
              Decode Token
            </Button>

            {decoded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <Tabs defaultValue="header" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="header">Header</TabsTrigger>
                    <TabsTrigger value="payload">Payload</TabsTrigger>
                    <TabsTrigger value="signature">Signature</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="header">
                    <Card>
                      <CardContent className="pt-6">
                        <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg font-mono text-sm">
                          {JSON.stringify(decoded.header, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="payload">
                    <Card>
                      <CardContent className="pt-6">
                        <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg font-mono text-sm">
                          {JSON.stringify(decoded.payload, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="signature">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm break-all">
                          {decoded.signature}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
