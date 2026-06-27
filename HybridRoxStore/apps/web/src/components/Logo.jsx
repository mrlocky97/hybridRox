import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import HXSymbol from './HXSymbol.jsx';

const Logo = ({ className }) => {
  return (
    <Link 
      to="/" 
      className={cn(
        "group flex flex-col md:flex-row items-center gap-2 md:gap-4 transition-opacity hover:opacity-90 z-[60]",
        className
      )}
      aria-label="HybridRoxStore Home"
    >
      <HXSymbol variant="logo" className="shrink-0" />
      <span className="font-['Bebas_Neue'] text-2xl md:text-3xl lg:text-4xl tracking-widest text-foreground mt-1 md:mt-1.5 hidden sm:block">
        HYBRIDROXSTORE
      </span>
    </Link>
  );
};

export default Logo;