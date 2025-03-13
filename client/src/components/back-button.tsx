import React from 'react';
import { useLocation } from "wouter";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export function BackButton() {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLocation('/tools')}
        className="mb-4 hover:bg-primary/10 transition-colors"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Tools
      </Button>
    </motion.div>
  );
} 