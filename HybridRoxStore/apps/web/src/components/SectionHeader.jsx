import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, align = 'center' }) => {
  const alignClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      className={`mb-12 ${alignClasses[align]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl normal-case font-normal">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;