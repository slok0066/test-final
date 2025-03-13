import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const examples = [
  {
    title: "JSON Data Processing",
    description: "Learn how to use our JSON tools to process and transform data.",
    tools: ["JSON Formatter", "JSON to YAML Converter", "CSV to JSON"],
    link: "#json-example"
  },
  {
    title: "Web Development Workflow",
    description: "Streamline your web development process with these tools.",
    tools: ["HTML Formatter", "CSS Minifier", "Code Beautifier"],
    link: "#web-dev-example"
  },
  {
    title: "Content Creation",
    description: "Create and format content more efficiently.",
    tools: ["Markdown Editor", "Text Case Converter", "Lorem Generator"],
    link: "#content-example"
  },
  {
    title: "API Testing",
    description: "Test and debug APIs with these powerful tools.",
    tools: ["API Tester", "JWT Debugger", "API Status"],
    link: "#api-example"
  }
];

export default function Examples() {
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
          <h1 className="text-4xl font-bold mb-4">Examples</h1>
          <p className="text-muted-foreground text-lg">
            Real-world examples and use cases of WebToolKit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Tools Used:</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {example.tools.map(tool => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={example.link} className="flex items-center gap-2">
                      View Example
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-12">
          <div id="json-example">
            <h2 className="text-2xl font-bold mb-4">JSON Data Processing</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                In this example, we'll show how to process JSON data using WebToolKit's JSON tools.
              </p>
              <h3>Step 1: Format and Validate JSON</h3>
              <p>
                Start by using the JSON Formatter tool to format and validate your JSON data. This helps identify any syntax errors and makes the data more readable.
              </p>
              <h3>Step 2: Convert JSON to YAML</h3>
              <p>
                If you need to convert your JSON data to YAML for configuration files or other purposes, use the JSON to YAML Converter tool.
              </p>
              <h3>Step 3: Import CSV Data</h3>
              <p>
                If your data is in CSV format, use the CSV to JSON tool to convert it to JSON for further processing.
              </p>
            </div>
          </div>

          <div id="web-dev-example">
            <h2 className="text-2xl font-bold mb-4">Web Development Workflow</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                This example demonstrates how to use WebToolKit to streamline your web development workflow.
              </p>
              <h3>Step 1: Format HTML</h3>
              <p>
                Use the HTML Formatter tool to clean up and format your HTML code, making it more readable and maintainable.
              </p>
              <h3>Step 2: Minify CSS</h3>
              <p>
                Use the CSS Minifier tool to reduce the size of your CSS files for production, improving load times.
              </p>
              <h3>Step 3: Beautify JavaScript</h3>
              <p>
                Use the Code Beautifier tool to format your JavaScript code according to best practices.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 