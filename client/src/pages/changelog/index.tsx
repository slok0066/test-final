import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Changelog() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Changelog
        </h1>
        <p className="text-muted-foreground text-lg">
          Track our progress and latest updates
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Version 2.0.0</h2>
              <p className="text-sm text-muted-foreground">March 15, 2024</p>
            </div>
            <Badge>Major Release</Badge>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Complete UI overhaul with new design system</li>
            <li>• Added 20+ new developer tools</li>
            <li>• Enhanced performance and loading times</li>
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Version 1.2.0</h2>
              <p className="text-sm text-muted-foreground">March 1, 2024</p>
            </div>
            <Badge variant="secondary">Minor Release</Badge>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Added dark mode support</li>
            <li>• Fixed routing issues in static pages</li>
          </ul>
        </Card>
      </div>
    </div>
  );
} 