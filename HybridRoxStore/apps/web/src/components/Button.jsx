import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  to, 
  href, 
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center min-h-[44px] px-8 py-3 font-['Bebas_Neue'] text-xl tracking-widest uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-foreground hover:text-background",
    secondary: "bg-card text-foreground border border-border hover:border-primary hover:text-primary",
    outline: "bg-transparent text-foreground border-2 border-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground",
    ghost: "bg-transparent text-foreground hover:text-primary hover:bg-muted/50"
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={classes} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;