import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    try {
      setOutput(btoa(input));
      toast({
        title: "Text encoded successfully",
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
      setOutput(atob(input));
      toast({
        title: "Text decoded successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Decoding failed",
        description: "Invalid Base64 string",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Base64 Tools</h1>
        <p className="text-muted-foreground">
          Encode and decode Base64 strings.
        </p>
      </div>

      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid gap-4"
        >
          <Card>
            <CardContent className="pt-6">
              <Textarea
                placeholder="Enter text..."
                className="min-h-[200px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <TabsContent value="encode">
              <Button size="lg" onClick={encode}>Encode to Base64</Button>
            </TabsContent>
            <TabsContent value="decode">
              <Button size="lg" onClick={decode}>Decode from Base64</Button>
            </TabsContent>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Textarea
                readOnly
                className="min-h-[200px]"
                value={output}
                placeholder="Result will appear here..."
              />
            </CardContent>
          </Card>
        </motion.div>
      </Tabs>
    </div>
  );
}
