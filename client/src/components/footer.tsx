import { Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-6 md:py-8">
        <div className={cn(
          "grid gap-6 md:gap-8",
          isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"
        )}>
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
              <span className="font-bold">WebToolKit</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              A collection of tools to help developers build better software, faster.
            </p>
            <div className="mt-4">
              <a 
                href="https://instagram.com/king_togetherness" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5 mr-2" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className={cn(isMobile && "mt-2")}>
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} WebToolKit by Shlok. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 