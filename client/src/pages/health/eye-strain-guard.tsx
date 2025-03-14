import React, { useState } from 'react';
import { RouteComponentProps } from 'wouter';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Eye, Sun, Moon, AlertTriangle, Clock } from 'lucide-react';

const EyeStrainGuard: React.FC<RouteComponentProps> = () => {
  const [ambientLight, setAmbientLight] = useState(50);
  const [screenBrightness, setScreenBrightness] = useState(80);
  const [strainLevel, setStrainLevel] = useState(30);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Eye Strain Guard</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Monitor screen brightness and suggest breaks using ambient light
      </p>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Eye Strain Monitor</h3>
              <Button>
                Start Monitoring
              </Button>
            </div>
            
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    <span>Ambient Light</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{ambientLight}%</span>
                </div>
                <Slider 
                  value={[ambientLight]} 
                  onValueChange={(value) => setAmbientLight(value[0])}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-2" />
                    <span>Screen Brightness</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{screenBrightness}%</span>
                </div>
                <Slider 
                  value={[screenBrightness]} 
                  onValueChange={(value) => setScreenBrightness(value[0])}
                  max={100}
                  step={1}
                />
          </div>

              <div className="space-y-2">
            <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>Eye Strain Level</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{strainLevel}%</span>
                </div>
                <Progress value={strainLevel} className="h-2" />
              </div>
            </div>
            </div>
          </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Adjust Screen Brightness</h4>
                <p className="text-sm text-muted-foreground">
                  Your screen is too bright relative to ambient light. Consider reducing brightness to 60%.
                </p>
            </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Take a Break</h4>
                <p className="text-sm text-muted-foreground">
                  You've been looking at the screen for a while. Consider taking a 5-minute break.
            </p>
          </div>
            </div>
          </div>
        </Card>
          </div>
        </div>
  );
};

export default EyeStrainGuard; 