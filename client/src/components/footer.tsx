import { Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "wouter";

const footerLinks = [
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Changelog", href: "/changelog" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "License", href: "/license" },
    ]
  }
];

export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
      <div className="container px-4 py-8 md:py-12">
        <div className={cn(
          "grid gap-8 md:gap-12",
          isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4"
        )}>
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-md">
                <img src="/logo.svg" alt="Logo" className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">WebToolKit</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              A collection of professional web tools to help developers build better software, faster. Designed with performance and usability in mind.
            </p>
            <div className="mt-6">
              <a 
                href="https://instagram.com/king_togetherness" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground hover:text-pink-500 transition-colors group"
              >
                <div className="p-2 rounded-full bg-pink-500/10 mr-3 group-hover:bg-pink-500/20 transition-colors">
                  <Instagram className="h-5 w-5 text-pink-500" />
                </div>
                <span className="font-medium">Follow on Instagram</span>
              </a>
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <motion.div 
              key={section.title} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(isMobile && "mt-6")}
            >
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                    >
                      <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className="my-8 opacity-50" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs md:text-sm text-muted-foreground">
            © {currentYear} WebToolKit by Shlok. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
            <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 