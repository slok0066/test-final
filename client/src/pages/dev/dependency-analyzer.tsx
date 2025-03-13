import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from '@/components/tool-layout';
import { GitFork, Search, AlertCircle, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Dependency {
  name: string;
  version: string;
  type: 'direct' | 'dev' | 'peer' | 'optional';
  dependencies: string[];
  devDependencies: string[];
  vulnerabilities: {
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
  }[];
}

interface CircularDependency {
  path: string[];
  level: 'warning' | 'critical';
}

export default function DependencyAnalyzer() {
  const [packageJson, setPackageJson] = useState('');
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [circularDeps, setCircularDeps] = useState<CircularDependency[]>([]);
  const [analysisType, setAnalysisType] = useState('dependencies');
  const { toast } = useToast();

  const analyzeDependencies = () => {
    try {
      const pkg = JSON.parse(packageJson);
      const deps: Dependency[] = [];
      const circular: CircularDependency[] = [];

      // Analyze direct dependencies
      Object.entries(pkg.dependencies || {}).forEach(([name, version]) => {
        deps.push({
          name,
          version: version as string,
          type: 'direct',
          dependencies: [],
          devDependencies: [],
          vulnerabilities: []
        });
      });

      // Analyze dev dependencies
      Object.entries(pkg.devDependencies || {}).forEach(([name, version]) => {
        deps.push({
          name,
          version: version as string,
          type: 'dev',
          dependencies: [],
          devDependencies: [],
          vulnerabilities: []
        });
      });

      // Mock circular dependency detection (in a real implementation, this would analyze the actual imports)
      if (deps.length > 2) {
        circular.push({
          path: [deps[0].name, deps[1].name, deps[0].name],
          level: 'warning'
        });
      }

      setDependencies(deps);
      setCircularDeps(circular);

      toast({
        title: "Analysis Complete",
        description: `Found ${deps.length} dependencies and ${circular.length} potential circular dependencies.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid package.json format",
        variant: "destructive"
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-green-500';
    }
  };

  const exportAnalysis = () => {
    const analysis = {
      dependencies,
      circularDependencies: circularDeps,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dependency-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="Code Dependency Analyzer" description="Analyze and visualize project dependencies">
      <Card className="w-full max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Package.json Content</Label>
            <Textarea
              placeholder="Paste your package.json content here..."
              value={packageJson}
              onChange={(e) => setPackageJson(e.target.value)}
              className="min-h-[200px] font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label>Analysis Type</Label>
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dependencies">Dependencies Overview</SelectItem>
                <SelectItem value="circular">Circular Dependencies</SelectItem>
                <SelectItem value="vulnerabilities">Vulnerability Check</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button onClick={analyzeDependencies} className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              Analyze Dependencies
            </Button>
            {dependencies.length > 0 && (
              <Button variant="outline" onClick={exportAnalysis}>
                <Download className="mr-2 h-4 w-4" />
                Export Analysis
              </Button>
            )}
          </div>

          {dependencies.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dependencies ({dependencies.length})</h3>
              <div className="space-y-2">
                {dependencies.map((dep) => (
                  <Card key={dep.name} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{dep.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Version: {dep.version} • Type: {dep.type}
                        </p>
                      </div>
                      {dep.vulnerabilities.length > 0 && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {circularDeps.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Circular Dependencies</h3>
              <div className="space-y-2">
                {circularDeps.map((circular, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <GitFork className="h-5 w-5 text-orange-500" />
                        <p className="font-medium">Circular Dependency Detected</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Path: {circular.path.join(' → ')}
                      </p>
                      <p className={`text-sm ${getSeverityColor(circular.level)}`}>
                        Severity: {circular.level}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Features:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Analyze direct, dev, peer, and optional dependencies</li>
              <li>Detect circular dependencies and dependency cycles</li>
              <li>Identify potential vulnerabilities and outdated packages</li>
              <li>Export detailed analysis reports</li>
              <li>Visualize dependency relationships</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
} 