import { ToolLayout } from "@/components/tool-layout";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const changes = [
  {
    version: "1.2.0",
    date: "2024-03-20",
    changes: [
      { type: "feature", description: "Added new color palette generator" },
      { type: "improvement", description: "Enhanced SQL formatter performance" },
      { type: "fix", description: "Fixed dark mode toggle issues" }
    ]
  },
  // Add more changelog entries
];

export default function Changelog() {
  return (
    <ToolLayout
      title="Changelog"
      description="Track our latest updates and improvements"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {changes.map((release, index) => (
          <motion.div
            key={release.version}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-4 border-l-2 border-primary"
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold">v{release.version}</h3>
              <p className="text-sm text-muted-foreground">{release.date}</p>
            </div>
            <ul className="space-y-3">
              {release.changes.map((change, changeIndex) => (
                <li key={changeIndex} className="flex items-start gap-2">
                  <Badge
                    variant={
                      change.type === "feature"
                        ? "default"
                        : change.type === "improvement"
                        ? "secondary"
                        : "destructive"
                    }
                    className="mt-1"
                  >
                    {change.type}
                  </Badge>
                  <span>{change.description}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </ToolLayout>
  );
} 