import { Link, useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Twitter, Search, ChevronLeft, Sun, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tool } from "@/lib/tool-categories";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import React from 'react';
import AdSense from "./AdSense";

// Header Component
function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <a className="flex items-center space-x-2 transition-colors hover:text-primary">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                WebToolKit
              </span>
            </a>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/tools">
              <a className="text-sm font-medium transition-colors hover:text-primary hover:scale-105 transform">Tools</a>
            </Link>
            <Link href="/docs">
              <a className="text-sm font-medium transition-colors hover:text-primary hover:scale-105 transform">Documentation</a>
            </Link>
            <Link href="/changelog">
              <a className="text-sm font-medium transition-colors hover:text-primary hover:scale-105 transform">Changelog</a>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="w-[200px] md:w-[300px] pl-9 pr-4 focus-visible:ring-primary transition-all duration-200 group-hover:w-[350px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors hover:scale-105 transform">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors hover:scale-105 transform">
              <Sun className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/">
              <a className="flex items-center space-x-2 mb-4">
                <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  WebToolKit
                </span>
              </a>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              A collection of useful web tools to help you with your daily tasks.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools">
                  <a className="text-muted-foreground hover:text-primary text-sm">Tools</a>
                </Link>
              </li>
              <li>
                <Link href="/docs">
                  <a className="text-muted-foreground hover:text-primary text-sm">Documentation</a>
                </Link>
              </li>
              <li>
                <Link href="/changelog">
                  <a className="text-muted-foreground hover:text-primary text-sm">Changelog</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/getting-started">
                  <a className="text-muted-foreground hover:text-primary text-sm">Getting Started</a>
                </Link>
              </li>
              <li>
                <Link href="/docs/api">
                  <a className="text-muted-foreground hover:text-primary text-sm">API Reference</a>
                </Link>
              </li>
              <li>
                <Link href="/docs/examples">
                  <a className="text-muted-foreground hover:text-primary text-sm">Examples</a>
                </Link>
              </li>
              <li>
                <Link href="/docs/faq">
                  <a className="text-muted-foreground hover:text-primary text-sm">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">
                  <a className="text-muted-foreground hover:text-primary text-sm">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-muted-foreground hover:text-primary text-sm">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/license">
                  <a className="text-muted-foreground hover:text-primary text-sm">License</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WebToolKit. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/privacy">
              <a className="text-sm text-muted-foreground hover:text-primary">Privacy</a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-muted-foreground hover:text-primary">Terms</a>
            </Link>
            <Link href="/license">
              <a className="text-sm text-muted-foreground hover:text-primary">License</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Tool Grid Component with improved card design
export function ToolGrid({ tools }: { tools: Tool[] }) {
  const [, setLocation] = useLocation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card
            className={cn(
              "group relative overflow-hidden border transition-all hover:border-primary hover:shadow-lg",
              "cursor-pointer h-full bg-gradient-to-br from-background to-background/50"
            )}
            onClick={() => setLocation(tool.path)}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                {tool.icon && (
                  <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <tool.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                )}
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm flex-grow">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center text-xs text-muted-foreground/80">
                <span className="flex items-center">
                  <span className="mr-2 text-primary">●</span>
                  Free & Open Source
                </span>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 transition-colors rounded-lg" />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// Main Layout Component
interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  const [location] = useLocation();
  const [isValidRoute] = useRoute(location);

  if (!isValidRoute) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-20 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Tool Coming Soon</h1>
        <p className="text-muted-foreground mb-8">
          This tool is under development and will be available soon.
        </p>
        <BackButton />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container py-6 space-y-4"
    >
      <div className="space-y-2">
        <BackButton />
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          {description}
        </motion.p>
      </div>
      
      {/* Ad before the tool content */}
      <AdSense adSlot="5678901234" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
      
      {/* Ad after the tool content */}
      <AdSense adSlot="3456789012" adFormat="horizontal" />
    </motion.div>
  );
}