import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

const GIT_COMMANDS = [
  {
    command: "git init",
    description: "Initialize a new Git repository"
  },
  {
    command: "git clone [url]",
    description: "Clone a repository into a new directory"
  },
  {
    command: "git add [file]",
    description: "Add file contents to the index"
  },
  {
    command: "git commit -m [message]",
    description: "Record changes to the repository"
  },
  {
    command: "git push",
    description: "Update remote refs along with associated objects"
  }
];

export default function GitHelper() {
  return (
    <ToolLayout
      title="Git Command Helper"
      description="Quick reference for common Git commands and their usage."
    >
      <div className="grid gap-4">
        {GIT_COMMANDS.map((item, index) => (
          <motion.div
            key={item.command}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="font-mono text-lg mb-2">{item.command}</div>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </ToolLayout>
  );
}
