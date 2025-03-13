import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FORMULAS = {
  physics: [
    { name: "Force", formula: "F = ma", description: "Force equals mass times acceleration" },
    { name: "Energy", formula: "E = mc²", description: "Energy equals mass times speed of light squared" },
    { name: "Power", formula: "P = W/t", description: "Power equals work divided by time" },
    { name: "Velocity", formula: "v = d/t", description: "Velocity equals distance divided by time" },
    { name: "Acceleration", formula: "a = (v - v₀)/t", description: "Change in velocity over time" }
  ],
  mathematics: [
    { name: "Pythagorean Theorem", formula: "a² + b² = c²", description: "In a right triangle, the square of the hypotenuse equals the sum of squares of the other sides" },
    { name: "Area of Circle", formula: "A = πr²", description: "Area equals pi times radius squared" },
    { name: "Volume of Sphere", formula: "V = (4/3)πr³", description: "Volume equals four-thirds pi times radius cubed" },
    { name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac))/2a", description: "Solutions to quadratic equation ax² + bx + c = 0" }
  ],
  chemistry: [
    { name: "Density", formula: "ρ = m/V", description: "Density equals mass divided by volume" },
    { name: "Pressure", formula: "P = F/A", description: "Pressure equals force divided by area" },
    { name: "Gas Law", formula: "PV = nRT", description: "Ideal gas law relating pressure, volume, moles, and temperature" },
    { name: "pH", formula: "pH = -log[H⁺]", description: "Negative log of hydrogen ion concentration" }
  ]
};

type Category = keyof typeof FORMULAS;

export default function FormulaReference() {
  const [category, setCategory] = useState<Category>("physics");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredFormulas = FORMULAS[category].filter(formula =>
    formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formula.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formula.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ToolLayout
      title="Formula Reference"
      description="Common scientific and mathematical formulas"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <Label>Search Formulas</Label>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or description..."
                  className="mt-2"
                />
              </div>

              <Tabs value={category} onValueChange={(value) => setCategory(value as Category)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="physics">Physics</TabsTrigger>
                  <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
                  <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                </TabsList>

                {Object.keys(FORMULAS).map((cat) => (
                  <TabsContent key={cat} value={cat}>
                    <div className="grid gap-4">
                      {filteredFormulas.map((formula, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card>
                            <CardContent className="pt-6">
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">{formula.name}</h3>
                                <div className="bg-muted p-3 rounded-md font-mono text-lg">
                                  {formula.formula}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {formula.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
