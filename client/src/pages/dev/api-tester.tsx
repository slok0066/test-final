import React from 'react';
import { ToolWrapper } from "@/components/tool-wrapper";
import { Construction } from "lucide-react";

export default function ApiTester() {
  return (
    <ToolWrapper
      toolName="API Tester"
      description="Test and debug API endpoints with an intuitive interface."
    >
      <div className="space-y-4 mt-6">
        <p className="text-muted-foreground text-sm">
          Upcoming features will include:
        </p>
        <ul className="text-muted-foreground text-sm space-y-2">
          <li>• Request history and collections</li>
          <li>• Environment variables management</li>
          <li>• Response validation tools</li>
          <li>• Documentation generation</li>
          <li>• Authentication handling</li>
        </ul>
      </div>
    </ToolWrapper>
  );
} 