import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ name, quote, achievement }) => {
  return (
    <motion.div
      className="card-premium"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Quote size={32} className="text-primary mb-4" />
      <p className="text-foreground mb-4 leading-relaxed italic">"{quote}"</p>
      <div className="border-t border-border pt-4">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground uppercase tracking-wide">{achievement}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;