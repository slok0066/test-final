import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Book, Code, FileText, MessageCircle, Zap, ArrowRight } from 'lucide-react';

const guides = [
  {
    title: "Getting Started",
    description: "Learn the basics of WebToolKit and how to use our tools.",
    icon: Book,
    href: "/docs/getting-started"
  },
  {
    title: "API Reference",
    description: "Detailed documentation of our API endpoints and parameters.",
    icon: Code,
    href: "/docs/api"
  },
  {
    title: "Examples",
    description: "Real-world examples and use cases of WebToolKit.",
    icon: FileText,
    href: "/docs/examples"
  },
  {
    title: "FAQ",
    description: "Frequently asked questions about WebToolKit.",
    icon: MessageCircle,
    href: "/docs/faq"
  }
];

export default function Documentation() {
  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Documentation
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Everything you need to know about WebToolKit
        </p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full pl-9 pr-4"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {guides.map((guide, index) => (
          <motion.div
            key={guide.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:border-primary transition-colors p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <guide.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {guide.description}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <a href={guide.href} className="flex items-center gap-2 group/link">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-primary/5 border-primary/10">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Quick Start Guide</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get up and running with WebToolKit in less than 5 minutes. Learn the basics and start using our tools right away.
              </p>
              <Button className="gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 