import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ApiReference() {
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
          <h1 className="text-4xl font-bold mb-4">API Reference</h1>
          <p className="text-muted-foreground text-lg">
            Detailed documentation of our API endpoints and parameters.
          </p>
        </div>

        <Tabs defaultValue="rest" className="mb-8">
          <TabsList>
            <TabsTrigger value="rest">REST API</TabsTrigger>
            <TabsTrigger value="js">JavaScript SDK</TabsTrigger>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
          </TabsList>
          <TabsContent value="rest" className="mt-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">REST API</h2>
              <p className="mb-4">
                Our REST API allows you to integrate WebToolKit functionality into your own applications.
                All endpoints are available at <code className="bg-muted px-1 py-0.5 rounded">https://api.webtoolkit.example/v1</code>.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Endpoints</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">GET /tools</h4>
                      <p className="text-sm text-muted-foreground">Returns a list of all available tools.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">GET /tools/{'{category}'}</h4>
                      <p className="text-sm text-muted-foreground">Returns tools in a specific category.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">POST /convert/base64</h4>
                      <p className="text-sm text-muted-foreground">Encode or decode Base64 strings.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">POST /format/json</h4>
                      <p className="text-sm text-muted-foreground">Format and validate JSON.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="js" className="mt-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">JavaScript SDK</h2>
              <p className="mb-4">
                Our JavaScript SDK makes it easy to integrate WebToolKit functionality into your web applications.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Installation</h3>
                  <pre className="bg-muted p-4 rounded overflow-x-auto">
                    <code>npm install webtoolkit-sdk</code>
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Usage</h3>
                  <pre className="bg-muted p-4 rounded overflow-x-auto">
                    <code>{`import { WebToolKit } from 'webtoolkit-sdk';

const toolkit = new WebToolKit('YOUR_API_KEY');

// Example: Format JSON
const result = await toolkit.format.json({
  data: '{"name":"John","age":30}'
});

console.log(result);`}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="auth" className="mt-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Authentication</h2>
              <p className="mb-4">
                All API requests require authentication using an API key.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Getting an API Key</h3>
                  <p>
                    To get an API key, sign up for a WebToolKit account and visit your account settings page.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Using Your API Key</h3>
                  <p className="mb-2">
                    Include your API key in the Authorization header of your requests:
                  </p>
                  <pre className="bg-muted p-4 rounded overflow-x-auto">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 