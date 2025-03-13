import React from 'react';
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { BackButton } from "./back-button";
import { ToolLayout } from "./tool-layout";

interface ComingSoonProps {
  toolName: string;
  description: string;
}

export function ComingSoon({ toolName, description }: ComingSoonProps) {
  return (
    <ToolLayout title={toolName} description={description}>
      <Card className="w-full max-w-2xl mx-auto p-8">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Construction className="w-16 h-16 mx-auto text-primary/60" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">Under Construction</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This tool is currently under development. We're working hard to bring you
              a great experience. Check back soon!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <div className="text-sm text-muted-foreground">
              <p>Expected features:</p>
              <ul className="mt-2 space-y-1">
                <li>• Feature 1</li>
                <li>• Feature 2</li>
                <li>• Feature 3</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Card>
    </ToolLayout>
  );
} 