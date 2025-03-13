import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Copy, Download, Users, Code } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: "License Grant",
    content: `Subject to these terms, WebToolKit grants you a worldwide, non-exclusive, non-transferable license to use the software for personal or business purposes.`
  },
  {
    icon: Users,
    title: "Usage Rights",
    content: `You may:
    • Use the software for any lawful purpose
    • Modify the software for your own use
    • Create derivative works
    • Distribute the software with attribution`
  },
  {
    icon: Copy,
    title: "Restrictions",
    content: `You may not:
    • Sell or sublicense the software
    • Remove copyright notices
    • Use trademarks without permission
    • Reverse engineer the software`
  },
  {
    icon: Code,
    title: "Source Code",
    content: `The source code is available under the MIT License. You can view, modify, and distribute it according to the terms of that license.`
  }
];

export default function License() {
  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          License Agreement
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Version 1.0 - Last updated: March 15, 2024
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            View Full License
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download License
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto mb-12"
      >
        <Card className="p-6">
          <p className="text-muted-foreground">
            This software is licensed under the MIT License. By using WebToolKit, you agree to comply
            with all terms and conditions outlined in this license agreement.
          </p>
        </Card>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
          >
            <Card className="h-full">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-primary/5">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <div className="text-muted-foreground text-sm whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-3xl mx-auto mt-12 p-6 bg-muted/50 rounded-lg"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">MIT License</h3>
          <p className="text-sm text-muted-foreground">
            Copyright (c) 2024 WebToolKit
            <br /><br />
            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            <br /><br />
            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 