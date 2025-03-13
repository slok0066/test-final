import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Check, AlertTriangle } from "lucide-react";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

type ValidationType = "json" | "jsonSchema" | "email" | "url" | "date" | "creditCard";

const DEFAULT_SCHEMA = `{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["name", "email"]
}`;

export default function DataValidator() {
  const [input, setInput] = useState("");
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [validationType, setValidationType] = useState<ValidationType>("json");
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors?: string[];
  } | null>(null);
  const { toast } = useToast();

  const validateData = () => {
    try {
      if (!input) {
        throw new Error("Please enter data to validate");
      }

      let isValid = false;
      let errors: string[] = [];

      switch (validationType) {
        case "json":
          JSON.parse(input);
          isValid = true;
          break;

        case "jsonSchema":
          try {
            const schemaObj = JSON.parse(schema);
            const validate = ajv.compile(schemaObj);
            const data = JSON.parse(input);
            isValid = validate(data);
            if (!isValid && validate.errors) {
              errors = validate.errors.map(err => 
                `${err.instancePath} ${err.message}`
              );
            }
          } catch (error) {
            throw new Error("Invalid JSON Schema");
          }
          break;

        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = emailRegex.test(input);
          if (!isValid) errors = ["Invalid email format"];
          break;

        case "url":
          try {
            new URL(input);
            isValid = true;
          } catch {
            isValid = false;
            errors = ["Invalid URL format"];
          }
          break;

        case "date":
          const date = new Date(input);
          isValid = !isNaN(date.getTime());
          if (!isValid) errors = ["Invalid date format"];
          break;

        case "creditCard":
          const ccRegex = /^[0-9]{16}$/;
          isValid = ccRegex.test(input.replace(/\s/g, ''));
          if (!isValid) errors = ["Invalid credit card number"];
          break;
      }

      setValidationResult({ valid: isValid, errors });
      toast({
        title: isValid ? "Validation passed" : "Validation failed",
        variant: isValid ? "default" : "destructive",
      });
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [(error as Error).message],
      });
      toast({
        title: "Validation failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Data Validator"
      description="Validate data against various formats and schemas"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Validation Type</Label>
                  <Select 
                    value={validationType} 
                    onValueChange={(value) => setValidationType(value as ValidationType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select validation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="jsonSchema">JSON Schema</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="creditCard">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Input Data</Label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter data to validate..."
                    className="font-mono min-h-[200px]"
                  />
                </div>

                {validationType === "jsonSchema" && (
                  <div className="space-y-2">
                    <Label>JSON Schema</Label>
                    <Textarea
                      value={schema}
                      onChange={(e) => setSchema(e.target.value)}
                      placeholder="Enter JSON schema..."
                      className="font-mono min-h-[200px]"
                    />
                  </div>
                )}

                <Button onClick={validateData} className="w-full">
                  Validate
                </Button>
              </div>

              <div className="space-y-4">
                <Label>Validation Result</Label>
                {validationResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className={`p-4 rounded-lg ${
                      validationResult.valid ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}>
                      <div className="flex items-center gap-2">
                        {validationResult.valid ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        <span className={validationResult.valid ? 'text-green-500' : 'text-red-500'}>
                          {validationResult.valid ? 'Valid' : 'Invalid'}
                        </span>
                      </div>
                    </div>

                    {validationResult.errors && validationResult.errors.length > 0 && (
                      <div className="space-y-2">
                        <Label>Errors</Label>
                        <div className="p-4 bg-muted rounded-lg">
                          <ul className="list-disc list-inside space-y-1">
                            {validationResult.errors.map((error, index) => (
                              <li key={index} className="text-sm text-red-500">
                                {error}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 