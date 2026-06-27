import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '@/hooks/useCart.jsx';
import { useToast } from '@/hooks/use-toast.js';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi.js';
import Button from './Button.jsx';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const displayVariant = useMemo(() => product.variants[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  const displayPrice = useMemo(() => hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted, [displayVariant, hasSale]);
  const originalPrice = useMemo(() => hasSale ? displayVariant.price_formatted : null, [displayVariant, hasSale]);
  
  const isOutOfStock = displayVariant?.manage_inventory && displayVariant?.inventory_quantity <= 0;

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.variants.length > 1) {
      navigate(`/producto/${product.id}`);
      return;
    }

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast({
        title: "Añadido al carrito",
        description: `${product.title} se ha añadido a tu carrito.`,
      });
    } catch (error) {
      toast({
        title: "Error al añadir",
        description: error.message,
        variant: "destructive"
      });
    }
  }, [product, addToCart, toast, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <Link to={`/producto/${product.id}`} className="block h-full">
        <div className="card-premium group flex flex-col h-full p-0 overflow-hidden">
          <div className="relative aspect-square bg-muted overflow-hidden">
            <img
              src={product.image || placeholderImage}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-300" />
            
            {product.ribbon_text && (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                {product.ribbon_text}
              </div>
            )}
            
            {isOutOfStock && (
              <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                Agotado
              </div>
            )}
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">{product.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{product.subtitle || 'Equipamiento premium para atletas híbridos.'}</p>
            
            <div className="flex items-end justify-between mb-4">
              <div className="flex flex-col">
                {hasSale && (
                  <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
                )}
                <span className="text-2xl font-bold text-primary">{displayPrice}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2 mt-auto"
              disabled={isOutOfStock}
            >
              <ShoppingCart size={18} /> 
              {isOutOfStock ? 'Agotado' : 'Añadir al carrito'}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsWithQuantities = async () => {
    try {
      setLoading(true);
      setError(null);

      const productsResponse = await getProducts();

      if (productsResponse.products.length === 0) {
        setProducts([]);
        return;
      }

      const productIds = productsResponse.products.map(product => product.id);

      const quantitiesResponse = await getProductQuantities({
        fields: 'inventory_quantity',
        product_ids: productIds
      });

      const variantQuantityMap = new Map();
      quantitiesResponse.variants.forEach(variant => {
        variantQuantityMap.set(variant.id, variant.inventory_quantity);
      });

      const productsWithQuantities = productsResponse.products.map(product => ({
        ...product,
        variants: product.variants.map(variant => ({
          ...variant,
          inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
        }))
      }));

      setProducts(productsWithQuantities);
    } catch (err) {
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsWithQuantities();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card-premium p-0 overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted w-full"></div>
            <div className="p-5 space-y-4">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-12 bg-muted rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12 card-premium border-destructive/50">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <p className="text-foreground mb-6">{error}</p>
        <Button onClick={fetchProductsWithQuantities} variant="primary">
          Reintentar
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-12 card-premium">
        <p className="text-muted-foreground text-lg">No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;