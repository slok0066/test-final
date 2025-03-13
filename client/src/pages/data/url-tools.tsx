import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function UrlTools() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
      toast({
        title: "URL encoded successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Encoding failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
      toast({
        title: "URL decoded successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Decoding failed",
        description: "Invalid URL encoding",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="URL Tools"
      description="Encode and decode URLs with proper handling of special characters."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card>
              <CardContent className="pt-6 space-y-4">
                <Input
                  placeholder="Enter URL..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <div className="flex justify-center">
                  <TabsContent value="encode">
                    <Button onClick={encode}>Encode URL</Button>
                  </TabsContent>
                  <TabsContent value="decode">
                    <Button onClick={decode}>Decode URL</Button>
                  </TabsContent>
                </div>

                {output && (
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-mono break-all">{output}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Tabs>
      </div>
    </ToolLayout>
  );
}
