import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { toast } from 'sonner';

const ProductoPage = () => {
  const { id } = useParams();

  const product = {
    id: parseInt(id),
    name: 'Rodilleras de compresión Pro',
    price: '€34.99',
    rating: 5,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1682531024005-469dd3f99935?w=800&h=800&fit=crop',
    description: 'Rodilleras de compresión de grado profesional diseñadas específicamente para atletas híbridos. Proporcionan soporte óptimo durante lunges, wall balls, y movimientos de alta intensidad sin comprometer la movilidad.',
    features: [
      'Compresión graduada para mejor circulación',
      'Material transpirable de secado rápido',
      'Refuerzo en zona rotuliana',
      'Diseño antideslizante',
      'Talla única ajustable',
    ],
    specs: [
      { label: 'Material', value: 'Nylon 70%, Spandex 30%' },
      { label: 'Grosor', value: '5mm' },
      { label: 'Tallas', value: 'S, M, L, XL' },
      { label: 'Color', value: 'Negro' },
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Grips profesionales',
      price: '€24.99',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=600&h=600&fit=crop',
    },
    {
      id: 5,
      name: 'Cinturón de levantamiento',
      price: '€44.99',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
    },
    {
      id: 10,
      name: 'Muñequeras de soporte',
      price: '€16.99',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
    },
  ];

  const handleAddToCart = () => {
    toast.success('Producto añadido al carrito');
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} - HybridRoxStore`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-foreground mb-4 normal-case">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < product.rating ? 'fill-primary text-primary' : 'text-muted'}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground normal-case font-normal">
                  ({product.reviews} valoraciones)
                </span>
              </div>

              <p className="text-4xl font-bold text-primary mb-6">{product.price}</p>

              <p className="text-foreground mb-8 leading-relaxed normal-case font-normal">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Características</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground normal-case font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Especificaciones</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground normal-case font-normal">{spec.label}</span>
                      <span className="text-foreground font-medium normal-case">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Añadir al carrito
              </Button>
            </motion.div>
          </div>

          <div>
            <SectionHeader
              title="Productos relacionados"
              subtitle="Otros productos que podrían interesarte"
              align="left"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductoPage;