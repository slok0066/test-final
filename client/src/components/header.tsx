import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Command,
  Instagram,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useSearch } from "@/lib/search-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { searchTerm, performSearch } = useSearch();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    performSearch(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      performSearch(searchTerm);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-bold">WebToolKit</span>
          </Link>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-2xl px-8">
          <div className="relative w-full">
            <Command className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <a 
            href="https://instagram.com/king_togetherness" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" className="hover:text-pink-500">
              <Instagram className="h-5 w-5" />
            </Button>
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t"
        >
          <div className="container py-4">
            <Input
              type="search"
              placeholder="Search tools..."
              className="w-full"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </motion.div>
      )}
    </header>
  );
} 