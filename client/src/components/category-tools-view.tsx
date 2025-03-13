import { motion } from "framer-motion";
import { Category } from "@/lib/tool-categories";
import { Card } from "./ui/card";
import { Link } from "wouter";

interface CategoryToolsViewProps {
  category: Category;
}

export function CategoryToolsView({ category }: CategoryToolsViewProps) {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Category Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg">
                <category.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                  {category.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {category.tools.length} tools available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.tools.map((tool, index) => (
            <motion.div
              key={tool.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={tool.path}>
                <Card className="group h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-primary/20 overflow-hidden relative">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {tool.icon && <tool.icon className="w-6 h-6 text-primary" />}
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {tool.description}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
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