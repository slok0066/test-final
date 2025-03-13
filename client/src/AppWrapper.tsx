import React from 'react';
import App from './App';
import { SearchProvider } from '@/lib/search-context';

export default function AppWrapper() {
  return (
    <SearchProvider>
      <App />
    </SearchProvider>
  );
} 