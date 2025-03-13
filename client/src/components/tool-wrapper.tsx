import React from 'react';
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { ToolLayout } from "./tool-layout";

interface ToolWrapperProps {
  children: React.ReactNode;
  toolName: string;
  description: string;
  isComingSoon?: boolean;
}

export function ToolWrapper({ children, toolName, description, isComingSoon = true }: ToolWrapperProps) {
  if (isComingSoon) {
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
                {description}
              </p>
            </motion.div>

            {children}
          </div>
        </Card>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout title={toolName} description={description}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </ToolLayout>
  );
}
