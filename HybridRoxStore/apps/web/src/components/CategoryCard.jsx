import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ icon: Icon, title, description, link }) => {
  return (
    <motion.div
      className="card-premium group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <Icon size={40} className="text-primary" />
      </div>
      <h3 className="text-xl mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
      <Link 
        to={link} 
        className="inline-flex items-center gap-2 text-primary font-medium uppercase text-sm tracking-athletic hover:gap-3 transition-all"
      >
        Ver más
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
};

export default CategoryCard;