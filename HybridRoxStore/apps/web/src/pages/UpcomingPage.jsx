import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';

const UpcomingPage = ({ setIsCartOpen }) => {
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Training Essentials');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pb.collection('waitlist').create({
        email,
        interest_category: category,
        product_name: 'General Waitlist'
      }, { $autoCancel: false });
      
      toast.success('¡Te has unido a la lista de espera! Te avisaremos pronto.');
      setEmail('');
    } catch (error) {
      toast.error('Error al unirse a la lista. Puede que ya estés registrado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Próximos Lanzamientos - HybridRoxStore</title>
        <meta name="description" content="Únete a la lista de espera para nuestros próximos lanzamientos de equipamiento híbrido." />
      </Helmet>
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="pt-32 pb-20 min-h-[100dvh]">
        <div className="container-custom max-w-2xl text-center">
          <SectionHeader title="Próximos Lanzamientos" subtitle="Equipamiento de nueva generación en desarrollo. Sé el primero en enterarte." />
          
          <motion.div 
            className="card-premium mt-12 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Únete a la lista de espera</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full p-3 bg-background border border-border rounded-md text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-foreground">¿Qué te interesa más?</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-md text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="Recovery">Recuperación</option>
                  <option value="Strength">Fuerza</option>
                  <option value="Endurance">Resistencia</option>
                  <option value="Performance Wear">Ropa Técnica</option>
                  <option value="Accessories">Accesorios</option>
                  <option value="Training Essentials">Esenciales de Entrenamiento</option>
                </select>
              </div>
              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Procesando...' : 'Avisadme'}
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UpcomingPage;