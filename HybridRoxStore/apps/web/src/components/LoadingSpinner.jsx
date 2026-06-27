import React from 'react';
import { cn } from '@/lib/utils';
import HXSymbol from './HXSymbol.jsx';

const LoadingSpinner = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)} role="status" aria-label="Loading">
      <HXSymbol size={64} variant="loader" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;