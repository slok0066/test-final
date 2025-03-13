import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Wrench,
  Box,
  Settings,
  Terminal,
  Braces,
  CodepenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Box,
    title: "100+ Developer Tools",
    description: "A comprehensive collection of tools for every developer's needs",
    gradient: "from-primary/20 to-secondary/20"
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "No installation required, use tools directly in your browser",
    gradient: "from-secondary/20 to-accent/20"
  },
  {
    icon: Terminal,
    title: "Built for Developers",
    description: "Created by developers, for developers, with modern features",
    gradient: "from-accent/20 to-primary/20"
  }
];

const developerInfo = {
  name: "Shlok",
  email: "thinkbuild8@gmail.com",
  role: "Developer & Creator"
};

export default function Introduction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, var(--primary) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-8 md:py-20 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 md:space-y-12 text-center w-full"
        >
          {/* Just the text "WebToolKit" */}
          <div className="space-y-4 md:space-y-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl opacity-50"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent relative">
                WebToolKit
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4"
            >
              Your complete developer toolkit for building amazing software.
              <br className="hidden md:block" />
              <span className="text-primary font-medium block md:inline mt-2 md:mt-0 md:ml-2">
                No installation required.
              </span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <Link href="/tools">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden px-6 py-4 md:px-8 md:py-6 text-base md:text-lg w-full md:w-auto"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Building
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-20 w-full"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative bg-card/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                <div className="mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-primary relative z-10" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Creator Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 md:mt-20 text-center"
        >
          <p className="text-sm md:text-base text-muted-foreground">
            Created with ❤️ by{" "}
            <a 
              href={`mailto:${developerInfo.email}`}
              className="text-primary hover:underline font-medium"
            >
              {developerInfo.name}
            </a>
          </p>
        </motion.div>

        {/* Floating Elements - Only show on larger screens */}
        <div className="hidden md:block">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 