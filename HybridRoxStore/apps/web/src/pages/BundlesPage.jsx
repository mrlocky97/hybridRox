import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';

const BundlesPage = ({ setIsCartOpen }) => {
  return (
    <>
      <Helmet>
        <title>Packs y Bundles - HybridRoxStore</title>
        <meta name="description" content="Ahorra comprando nuestros packs de equipamiento diseñados para atletas híbridos." />
      </Helmet>
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="pt-32 pb-20 min-h-[100dvh]">
        <div className="container-custom">
          <SectionHeader title="Packs y Bundles" subtitle="Combos diseñados para maximizar tu rendimiento y tu ahorro." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Placeholder for bundles since we don't have real bundle data from EcommerceApi yet */}
            <motion.div className="card-premium flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                <span className="text-muted-foreground font-bold text-xl">PACK COMPETICIÓN</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Pack Competición Hyrox</h3>
              <p className="text-muted-foreground mb-6 flex-grow">Rodilleras de compresión + Grips profesionales + Plan de 8 semanas.</p>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm text-muted-foreground line-through">€89.97</p>
                  <p className="text-3xl font-bold text-primary">€74.99</p>
                </div>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">-15%</span>
              </div>
              <Button variant="primary" className="w-full">Ver Pack</Button>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BundlesPage;