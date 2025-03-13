import { categories } from "@/lib/tool-categories";
import { Card } from "@/components/ui/card";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const categoryName = params?.category;
  
  // Special handling for "all-tools" category
  if (categoryName?.toLowerCase() === "all-tools") {
    const allTools = categories[0]; // The first category is All Tools
    return (
      <div className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <Link href="/tools" className="text-muted-foreground hover:text-foreground">
              ← Back to Categories
            </Link>
          </div>

          <div className="prose prose-lg dark:prose-invert">
            <h1 className="flex items-center gap-4">
              <Star className="w-8 h-8" />
              All Tools
            </h1>
            <p className="text-xl text-muted-foreground">
              {allTools.tools.length} tools available
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allTools.tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={tool.path}>
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {tool.icon && <tool.icon className="w-6 h-6 text-primary" />}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {tool.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  const category = categories.find(
    (cat) => cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categoryName?.toLowerCase()
  );

  if (!category) {
    console.log('Available categories:', categories.map(c => ({
      name: c.name,
      slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    })));
    console.log('Requested category:', categoryName);
    
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The category you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/tools" className="text-primary hover:underline">
          ← Back to All Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <Link href="/tools" className="text-muted-foreground hover:text-foreground">
            ← Back to Categories
          </Link>
        </div>

        <div className="prose prose-lg dark:prose-invert">
          <h1 className="flex items-center gap-4">
            <category.icon className="w-8 h-8" />
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            {category.tools.length} tools available
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={tool.path}>
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {tool.icon && <tool.icon className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
