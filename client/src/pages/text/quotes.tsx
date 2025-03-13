import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Loader2 } from "lucide-react";

const QUOTES = [
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost"
  },
  // Add more quotes as needed
];

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<typeof QUOTES[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const generateQuote = () => {
    setLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * QUOTES.length);
      setQuote(QUOTES[randomIndex]);
      setLoading(false);
    }, 500);
  };

  return (
    <ToolLayout
      title="Quote Generator"
      description="Generate random quotes and citations for inspiration."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            {quote ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <p className="text-xl font-serif italic">"{quote.text}"</p>
                <p className="text-right text-muted-foreground">— {quote.author}</p>
              </motion.div>
            ) : (
              <p className="text-center text-muted-foreground">
                Click the button below to generate a quote
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={generateQuote}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Quote
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
