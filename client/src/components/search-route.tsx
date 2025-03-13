import React from 'react';
import { Route } from 'wouter';
import SearchResults from '@/pages/search';

export function SearchRoute() {
  return <Route path="/search" component={SearchResults} />;
} 