import React from 'react';
import { RouteComponentProps } from 'wouter';

type RouteParams = Record<string, string>;

interface RouteWrapperProps {
  Component: React.ComponentType<RouteComponentProps<RouteParams>>;
}

export const RouteWrapper: React.FC<RouteComponentProps<RouteParams> & RouteWrapperProps> = ({ Component, ...props }) => {
  return <Component {...props} />;
}; 