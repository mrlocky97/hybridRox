import React from 'react';
import { cn } from '@/lib/utils';

export const HXSymbol = ({ size = 40, variant = 'logo', className }) => {
  const variantClasses = {
    icon: 'hx-symbol-icon',
    logo: 'hx-symbol-logo',
    loader: 'hx-symbol-loader animate-hx-pulse'
  };

  const isLoader = variant === 'loader';

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width={size} 
      height={size}
      className={cn(variantClasses[variant], className)}
      aria-label="HX Brand Symbol"
      role="img"
    >
      <rect width="100" height="100" fill="var(--hx-dark)" rx="16" />
      
      {/* Letter H */}
      <path 
        d="M22 28 V72 M22 50 H44 M44 28 V72" 
        stroke="var(--hx-white)" 
        strokeWidth="10" 
        strokeLinecap="square"
        fill="none" 
      />
      
      {/* Letter X */}
      <path 
        d="M56 28 L82 72 M82 28 L56 72" 
        stroke="var(--hx-white)" 
        strokeWidth="10" 
        strokeLinecap="square"
        fill="none" 
      />
      
      {/* Lightning Bolt */}
      <path 
        d="M51 16 L38 52 H51 L47 84 L64 48 H51 Z" 
        fill="var(--hx-primary)"
        className={cn(isLoader && "animate-hx-bolt-glow")}
      />
    </svg>
  );
};

export default HXSymbol;