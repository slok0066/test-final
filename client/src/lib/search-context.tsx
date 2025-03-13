import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { categories } from './tool-categories';
import { Tool } from './tool-categories';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Tool[];
  performSearch: (term: string) => void;
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [, setLocation] = useLocation();

  const performSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Get all tools from all categories (except the "All Tools" category)
    const allTools = categories
      .filter(category => category.name !== "All Tools")
      .flatMap(category => category.tools);
    
    // Remove duplicates (tools that appear in multiple categories)
    const uniqueTools = Array.from(
      new Map(allTools.map(tool => [tool.path, tool])).values()
    );
    
    // Filter tools based on search term
    const results = uniqueTools.filter(tool => {
      const searchLower = term.toLowerCase();
      return (
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.path.toLowerCase().includes(searchLower)
      );
    });
    
    setSearchResults(results);
    
    // Navigate to search results page if we have a search term
    if (term.trim()) {
      setLocation(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        performSearch,
        isSearching
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 