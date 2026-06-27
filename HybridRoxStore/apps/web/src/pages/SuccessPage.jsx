import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import { useCart } from '@/hooks/useCart.jsx';

const SuccessPage = ({ setIsCartOpen }) => {
  const { clearCart } = useCart();
  
  // Ensure cart is cleared on successful checkout return
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderNumber = `HRX-${Math.floor(100000 + Math.random() * 900000)}`;
  const date = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>Pedido Confirmado - HybridRoxStore</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header setIsCartOpen={setIsCartOpen} />

      <main className="pt-32 pb-20 min-h-[100dvh] flex items-center">
        <div className="container-custom max-w-3xl">
          <motion.div 
            className="card-premium text-center p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">¡Pedido Confirmado!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Gracias por tu compra. Tu equipamiento está en camino.
            </p>

            <div className="bg-background rounded-xl p-6 mb-8 border border-border text-left">
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-4">Resumen del pedido</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Número de pedido</p>
                  <p className="font-medium text-foreground">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                  <p className="font-medium text-foreground">{date}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-lg text-primary">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Envío en preparación</h3>
                  <p className="text-sm text-muted-foreground">Recibirás un email con el número de seguimiento cuando tu pedido sea enviado.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-lg text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Confirmación enviada</h3>
                  <p className="text-sm text-muted-foreground">Hemos enviado los detalles de tu compra a tu correo electrónico.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" to="/tienda" className="flex items-center justify-center gap-2">
                Continuar comprando <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" to="/">
                Volver al inicio
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SuccessPage;