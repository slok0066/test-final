import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function GettingStarted() {
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <Link href="/docs">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Documentation
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-muted-foreground text-lg">
            Learn the basics of WebToolKit and how to use our tools.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            WebToolKit is a comprehensive collection of web-based tools designed to help developers, designers, and other professionals streamline their workflow. This guide will help you get started with using WebToolKit effectively.
          </p>

          <h2>Navigating the Toolkit</h2>
          <p>
            WebToolKit is organized into categories to help you find the tools you need quickly:
          </p>
          <ul>
            <li><strong>Text & Content</strong> - Tools for working with text and content</li>
            <li><strong>Development Tools</strong> - Tools for developers</li>
            <li><strong>Data & Conversion</strong> - Tools for working with data and converting between formats</li>
            <li><strong>Visual & Media</strong> - Tools for working with images and other media</li>
            <li><strong>And many more categories</strong> covering various domains</li>
          </ul>

          <h2>Using the Tools</h2>
          <p>
            Each tool in WebToolKit follows a similar pattern:
          </p>
          <ol>
            <li>Select the tool you want to use from the homepage or category page</li>
            <li>Input your data or configure the tool settings</li>
            <li>Get your results instantly</li>
            <li>Copy, download, or share your results as needed</li>
          </ol>

          <h2>Search Functionality</h2>
          <p>
            If you're not sure where to find a specific tool, you can use the search bar at the top of the page to search for tools by name or description.
          </p>

          <h2>Next Steps</h2>
          <p>
            Now that you understand the basics, check out our <Link href="/docs/examples"><a className="text-primary hover:underline">Examples</a></Link> to see how WebToolKit can be used in real-world scenarios, or explore the <Link href="/docs/api"><a className="text-primary hover:underline">API Reference</a></Link> if you're interested in integrating with our tools programmatically.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 