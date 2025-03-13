import React from "react";
import { categories } from "@/lib/tool-categories";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function HealthToolsPage() {
  // Find the Health & Wellness category
  const healthCategory = categories.find(cat => cat.name === "Health & Wellness");

  if (!healthCategory) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold">Health & Wellness Tools</h1>
        <p className="mt-4">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 md:py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 md:space-y-8"
      >
        <div className="prose prose-lg dark:prose-invert">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Health & Wellness Tools</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Tools to help you monitor and improve your health and wellbeing
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {healthCategory.tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={tool.path}>
                <Card className="p-4 md:p-6 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {tool.icon && React.createElement(tool.icon, { className: "w-5 h-5 md:w-6 md:h-6 text-primary" })}
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h2>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 