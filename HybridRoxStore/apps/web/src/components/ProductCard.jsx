import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Button from './Button.jsx';

const ProductCard = ({ product }) => {
  const { id, image, name, price, rating = 5 } = product;

  return (
    <motion.div
      className="card-premium group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/producto/${id}`} className="block">
        <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-muted">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'fill-primary text-primary' : 'text-muted'}
            />
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground normal-case">{name}</h3>
        <p className="text-2xl font-bold text-primary mb-4">{price}</p>
      </Link>
      <Button variant="secondary" to={`/producto/${id}`} className="w-full">
        Ver producto
      </Button>
    </motion.div>
  );
};

export default ProductCard;