import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct, getProductQuantities } from '@/api/EcommerceApi.js';
import { useCart } from '@/hooks/useCart.jsx';
import { useToast } from '@/hooks/use-toast.js';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const ProductDetailPage = ({ setIsCartOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
      const availableQuantity = selectedVariant.inventory_quantity;
      try {
        await addToCart(product, selectedVariant, quantity, availableQuantity);
        toast({
          title: "Añadido al carrito",
          description: `${quantity} x ${product.title} añadido correctamente.`,
        });
        setIsCartOpen(true);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error al añadir",
          description: error.message,
        });
      }
    }
  }, [product, selectedVariant, quantity, addToCart, toast, setIsCartOpen]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + amount;
        if (newQuantity < 1) return 1;
        return newQuantity;
    });
  }, []);

  const handlePrevImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    }
  }, [product?.images?.length]);

  const handleNextImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    }
  }, [product?.images?.length]);

  const handleVariantSelect = useCallback((variant) => {
    setSelectedVariant(variant);

    if (variant.image_url && product?.images?.length > 0) {
      const imageIndex = product.images.findIndex(image => image.url === variant.image_url);

      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [product?.images]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);

        try {
          const quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: [fetchedProduct.id]
          });

          const variantQuantityMap = new Map();
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });

          const productWithQuantities = {
            ...fetchedProduct,
            variants: fetchedProduct.variants.map(variant => ({
              ...variant,
              inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
            }))
          };

          setProduct(productWithQuantities);

          if (productWithQuantities.variants && productWithQuantities.variants.length > 0) {
            setSelectedVariant(productWithQuantities.variants[0]);
          }
        } catch (quantityError) {
          throw quantityError;
        }
      } catch (err) {
        setError(err.message || 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, navigate]);

  if (loading) {
    return (
      <>
        <Header setIsCartOpen={setIsCartOpen} />
        <div className="flex justify-center items-center min-h-[80dvh]">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header setIsCartOpen={setIsCartOpen} />
        <div className="container-custom pt-32 pb-20 min-h-[80dvh]">
          <Link to="/tienda" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} />
            Volver a la tienda
          </Link>
          <div className="text-center p-12 card-premium border-destructive/50 max-w-2xl mx-auto">
            <AlertCircle className="mx-auto h-16 w-16 text-destructive mb-4" />
            <p className="text-foreground mb-6 text-lg">{error || 'Producto no encontrado'}</p>
            <Button variant="primary" to="/tienda">Ver catálogo</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const price = selectedVariant?.sale_price_formatted ?? selectedVariant?.price_formatted;
  const originalPrice = selectedVariant?.price_formatted;
  const availableStock = selectedVariant ? selectedVariant.inventory_quantity : 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const canAddToCart = !isStockManaged || quantity <= availableStock;

  const currentImage = product.images[currentImageIndex];
  const hasMultipleImages = product.images.length > 1;

  return (
    <>
      <Helmet>
        <title>{product.title} - HybridRoxStore</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.title} />
      </Helmet>
      
      <Header setIsCartOpen={setIsCartOpen} />

      <main className="pt-24 pb-20 min-h-[100dvh]">
        <div className="container-custom">
          <Link to="/tienda" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-medium uppercase tracking-athletic text-sm">
            <ArrowLeft size={16} />
            Volver a la tienda
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-muted aspect-square border border-border">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={!currentImage?.url ? placeholderImage : currentImage.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-primary hover:text-primary-foreground text-foreground p-3 rounded-full transition-colors backdrop-blur-sm"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-primary hover:text-primary-foreground text-foreground p-3 rounded-full transition-colors backdrop-blur-sm"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {product.ribbon_text && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-sm uppercase tracking-wider">
                    {product.ribbon_text}
                  </div>
                )}
              </div>

              {hasMultipleImages && (
                <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={!image.url ? placeholderImage : image.url}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 normal-case">{product.title}</h1>
              {product.subtitle && <p className="text-xl text-muted-foreground mb-6">{product.subtitle}</p>}

              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-border">
                <span className="text-4xl font-bold text-primary">{price}</span>
                {selectedVariant?.sale_price_in_cents && (
                  <span className="text-2xl text-muted-foreground line-through">{originalPrice}</span>
                )}
              </div>

              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none mb-8" dangerouslySetInnerHTML={{ __html: product.description }} />

              {product.variants.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-athletic mb-3">Variante</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantSelect(variant)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          selectedVariant?.id === variant.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card text-foreground border border-border hover:border-primary'
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <div className="flex items-center border border-border rounded-md bg-card h-14">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    className="px-4 h-full text-foreground hover:text-primary transition-colors flex items-center justify-center"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center text-foreground font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    className="px-4 h-full text-foreground hover:text-primary transition-colors flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart} 
                  variant="primary"
                  className="flex-grow h-14 flex items-center justify-center gap-2 text-lg"
                  disabled={!canAddToCart || !product.purchasable}
                >
                  <ShoppingCart size={20} /> 
                  {!product.purchasable ? 'No disponible' : (!canAddToCart ? 'Agotado' : 'Añadir al carrito')}
                </Button>
              </div>

              {isStockManaged && canAddToCart && product.purchasable && availableStock < 10 && (
                <p className="text-sm text-primary flex items-center gap-2 mb-4">
                  <CheckCircle size={16} /> ¡Solo quedan {availableStock} unidades!
                </p>
              )}

              {isStockManaged && !canAddToCart && product.purchasable && (
                 <p className="text-sm text-destructive flex items-center gap-2 mb-4">
                  <XCircle size={16} /> Stock insuficiente. Solo quedan {availableStock}.
                </p>
              )}

              {product.additional_info?.length > 0 && (
                <div className="mt-8 space-y-6 border-t border-border pt-8">
                  {product.additional_info
                    .sort((a, b) => a.order - b.order)
                    .map((info) => (
                      <div key={info.id}>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                        <div className="prose prose-invert prose-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: info.description }} />
                      </div>
                    ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailPage;