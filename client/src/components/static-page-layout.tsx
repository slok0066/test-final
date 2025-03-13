import { ToolLayout } from "./tool-layout";
import { Card } from "./ui/card";
import { motion } from "framer-motion";

interface StaticPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function StaticPageLayout({ title, description, children }: StaticPageLayoutProps) {
  return (
    <ToolLayout title={title} description={description}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-6 md:p-8 prose prose-lg dark:prose-invert max-w-none">
          {children}
        </Card>
      </motion.div>
    </ToolLayout>
  );
} 