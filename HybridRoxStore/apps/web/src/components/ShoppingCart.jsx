import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart.jsx';
import { initializeCheckout } from '@/api/EcommerceApi.js';
import { useToast } from '@/hooks/use-toast.js';
import Button from './Button.jsx';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Tu carrito está vacío',
        description: 'Añade algunos productos antes de proceder al pago.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      clearCart();
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Error en el pago',
        description: 'Hubo un problema al iniciar el pago. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  }, [cartItems, clearCart, toast]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-[100dvh] w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col z-50"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <ShoppingCartIcon size={24} className="text-primary" />
                Tu Carrito
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <ShoppingCartIcon size={32} className="text-muted-foreground" />
                  </div>
                  <p className="text-lg text-foreground font-medium">Tu carrito está vacío</p>
                  <p className="text-muted-foreground">Descubre nuestro equipamiento premium para atletas híbridos.</p>
                  <Button variant="primary" onClick={() => setIsCartOpen(false)} className="mt-4">
                    Ir a la tienda
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <div key={item.variant.id} className="flex gap-4 bg-background p-3 rounded-lg border border-border">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm line-clamp-2">{item.product.title}</h3>
                          {item.variant.title !== 'Default Title' && (
                            <p className="text-xs text-muted-foreground mt-1">{item.variant.title}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm font-bold text-primary">
                            {item.variant.sale_price_formatted || item.variant.price_formatted}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-border rounded-md bg-card">
                              <button 
                                onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} 
                                className="px-2 py-1 text-foreground hover:text-primary transition-colors"
                              >
                                -
                              </button>
                              <span className="px-2 text-sm font-medium text-foreground w-6 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} 
                                className="px-2 py-1 text-foreground hover:text-primary transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.variant.id)} 
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                              aria-label="Eliminar producto"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border bg-background/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium text-foreground">Total</span>
                  <span className="text-3xl font-bold text-primary">{getCartTotal()}</span>
                </div>
                <div className="space-y-3">
                  <Button onClick={handleCheckout} variant="primary" className="w-full flex items-center justify-center gap-2">
                    Proceder al pago <ArrowRight size={18} />
                  </Button>
                  <Button onClick={clearCart} variant="secondary" className="w-full">
                    Vaciar carrito
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;