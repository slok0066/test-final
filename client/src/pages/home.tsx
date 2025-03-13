import { categories } from "@/lib/tool-categories";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import AdSense from "@/components/AdSense";
import { useState, useEffect } from "react";
import React from "react";

export default function Home() {
  // Filter out only the "All Tools" category
  const mainCategories = categories.filter(cat => cat.name !== "All Tools");
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="container mx-auto py-6 md:py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 md:space-y-8"
      >
        <div className="prose prose-lg dark:prose-invert">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
            Web Toolkit
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Choose a category to explore our tools
          </p>
        </div>

        {/* Top Ad */}
        <AdSense adSlot="1234567890" />

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {mainCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/category/${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <Card className="p-4 md:p-6 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <category.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </h2>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {category.tools.length} tools
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Ad */}
        <AdSense adSlot="0987654321" adFormat="horizontal" />
      </motion.div>
    </div>
  );
}