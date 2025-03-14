import { categories } from "@/lib/tool-categories";
import { Card } from "@/components/ui/card";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { Star, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { ToolCard } from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const categoryName = params?.category;
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Special handling for "all-tools" category
  if (categoryName?.toLowerCase() === "all-tools") {
    const allTools = categories[0]; // The first category is All Tools
    return (
      <div className="container mx-auto py-6 md:py-12 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 md:space-y-12"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link href="/">
              <Button variant="ghost" size="sm" className="group flex items-center gap-2 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">Back to Home</span>
              </Button>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4"
            >
              <Star className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              All Tools
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground"
            >
              Explore our complete collection of {allTools.tools.length} professional web tools
            </motion.p>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allTools.tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} />
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
      <div className="container mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20 inline-block mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button className="rounded-full">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 md:py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 md:space-y-12"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Link href="/">
            <Button variant="ghost" size="sm" className="group flex items-center gap-2 hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span className="group-hover:text-primary transition-colors">Back to Home</span>
            </Button>
          </Link>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4"
          >
            <category.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            {category.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            {category.description || `Explore our collection of ${category.tools.length} ${category.name.toLowerCase()} tools`}
          </motion.p>
        </div>

        <div className={cn(
          "grid gap-4 md:gap-6",
          isMobile 
            ? "grid-cols-1" 
            : category.tools.length > 8 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {category.tools.map((tool, index) => (
            <ToolCard key={tool.name} tool={tool} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
