import React, { useEffect } from 'react';
import { useSearch } from '@/lib/search-context';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ToolCard } from '@/components/tool-card';

export default function SearchResults() {
  const { searchTerm, searchResults, performSearch } = useSearch();
  const [location] = useLocation();
  
  // Extract search query from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const queryParam = params.get('q');
    
    if (queryParam && queryParam !== searchTerm) {
      performSearch(queryParam);
    }
  }, [location, performSearch, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    performSearch(e.target.value);
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="prose prose-lg dark:prose-invert">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
            Search Results
          </h1>
          <p className="text-xl text-muted-foreground">
            {searchResults.length > 0 
              ? `Found ${searchResults.length} tools matching "${searchTerm}"`
              : searchTerm 
                ? `No tools found matching "${searchTerm}"`
                : "Search for tools by name or description"
            }
          </p>
        </div>

        <Card className="p-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </Card>

        {searchResults.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((tool) => (
              <ToolCard
                key={tool.path}
                tool={tool}
              />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h2 className="mt-4 text-xl font-semibold">No results found</h2>
            <p className="mt-2 text-muted-foreground">
              Try searching with different keywords or browse our categories
            </p>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
} 