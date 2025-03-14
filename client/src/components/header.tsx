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
import { useState, useEffect } from "react";
import { useSearch } from "@/lib/search-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { searchTerm, performSearch } = useSearch();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Check scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isScrolled ? 'shadow-md' : 'shadow-sm'} transition-all duration-300`}>
      <div className="container flex h-16 md:h-18 items-center justify-between px-4 md:px-6">
        {/* Logo & Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg rounded-lg overflow-hidden">
              <img 
                src="/logo.svg" 
                alt="WebToolKit Logo" 
                className="w-full h-full drop-shadow-md transition-all duration-300 group-hover:brightness-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 group-hover:opacity-80 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 transition-all duration-300 group-hover:from-pink-500 group-hover:to-blue-600">
                WebToolKit
              </span>
              <span className="text-xs text-muted-foreground hidden md:inline-block">Professional Web Tools</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-8 space-x-1">
            <Link href="/tools">
              <Button variant="ghost" size="sm" className="font-medium hover:bg-primary/10 hover:text-primary transition-all rounded-full">All Tools</Button>
            </Link>
            <Link href="/health-tools">
              <Button variant="ghost" size="sm" className="font-medium hover:bg-primary/10 hover:text-primary transition-all rounded-full">Health Tools</Button>
            </Link>
            <Link href="/docs">
              <Button variant="ghost" size="sm" className="font-medium hover:bg-primary/10 hover:text-primary transition-all rounded-full">Docs</Button>
            </Link>
          </nav>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-2xl px-8">
          <div className="relative w-full">
            <Command className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="w-full pl-10 border-primary/20 focus:border-primary/50 transition-all rounded-full shadow-sm focus:shadow-md"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-primary/10 transition-colors">
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <a 
            href="https://instagram.com/king_togetherness" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group"
          >
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-500/10 hover:text-pink-500 transition-all">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Button>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-background border text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden md:block">
              Follow us
            </span>
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t bg-background/95 backdrop-blur-md shadow-md overflow-hidden"
        >
          <div className="container py-4 px-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                className="w-full pl-10 border-primary/20 focus:border-primary/50 transition-all rounded-full"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link href="/tools">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/5 hover:border-primary/30 transition-all rounded-lg">
                  <span>All Tools</span>
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/5 hover:border-primary/30 transition-all rounded-lg">
                  <span>Documentation</span>
                </Button>
              </Link>
              <Link href="/changelog">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/5 hover:border-primary/30 transition-all rounded-lg">
                  <span>Changelog</span>
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/5 hover:border-primary/30 transition-all rounded-lg">
                  <span>Community</span>
                </Button>
              </Link>
              <Link href="/health-tools">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/5 hover:border-primary/30 transition-all rounded-lg">
                  <span>Health Tools</span>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
} 