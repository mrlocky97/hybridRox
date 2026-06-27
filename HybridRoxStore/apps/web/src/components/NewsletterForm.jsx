import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import Button from './Button.jsx';
import { toast } from 'sonner';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor, introduce un email válido');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setEmail('');
      toast.success('Listo. Revisa tu email.');
    }, 1500);
  };

  if (isSuccess) {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CheckCircle size={48} className="text-primary mx-auto mb-4" />
        <p className="text-xl font-semibold text-foreground mb-2">Listo. Revisa tu email.</p>
        <p className="text-muted-foreground">Te hemos enviado el plan gratuito de 4 semanas.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="whitespace-nowrap"
        >
          {isLoading ? 'Enviando...' : 'Quiero el plan'}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-3 text-center">
        1 tip, 1 guía y 1 recurso. Sin humo.
      </p>
    </form>
  );
};

export default NewsletterForm;