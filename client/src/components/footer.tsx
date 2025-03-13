import { Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

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
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
              <span className="font-bold">WebToolKit</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
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
            <div key={section.title}>
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-3">
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

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} WebToolKit by Shlok. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 