import { StaticPageLayout } from "@/components/static-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, Code, Terminal, Zap, Settings, Shield } from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    icon: Zap,
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Quick Start", href: "#quick-start" },
      { title: "Installation", href: "#installation" }
    ]
  },
  {
    title: "Tools & Features",
    icon: Terminal,
    items: [
      { title: "Text Tools", href: "#text-tools" },
      { title: "Development Tools", href: "#dev-tools" },
      { title: "Security Tools", href: "#security-tools" }
    ]
  },
  {
    title: "API Reference",
    icon: Code,
    items: [
      { title: "REST API", href: "#rest-api" },
      { title: "WebSocket API", href: "#websocket-api" },
      { title: "Authentication", href: "#authentication" }
    ]
  }
];

export default function Documentation() {
  return (
    <StaticPageLayout
      title="Documentation"
      description="Learn how to use our tools effectively"
    >
      <div className="grid gap-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome to WebToolKit documentation. Here you'll find comprehensive guides and documentation to help you start working with our tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 id="introduction">Introduction</h2>
          <p>
            WebToolKit is a comprehensive collection of development tools designed to make your workflow more efficient.
            Whether you're a frontend developer, backend engineer, or full-stack developer, we have tools that will help you work faster and smarter.
          </p>

          <h2 id="quick-start">Quick Start</h2>
          <p>
            Getting started with WebToolKit is easy. Simply browse our categories or use the search function to find the tool you need.
            All tools are web-based and require no installation.
          </p>

          {/* Add more documentation content */}
        </div>
      </div>
    </StaticPageLayout>
  );
} 