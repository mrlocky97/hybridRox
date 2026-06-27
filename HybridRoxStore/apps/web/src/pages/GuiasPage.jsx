import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';
import { toast } from 'sonner';

const GuiasPage = () => {
  const guides = [
    {
      id: 1,
      title: 'Plan Hyrox 8 semanas - Principiante',
      description: 'Programa completo para preparar tu primera competición Hyrox. Incluye progresión de volumen, técnica de estaciones y pacing.',
      format: 'PDF - 24 páginas',
      price: '€29.99',
      image: 'https://images.unsplash.com/photo-1578226978638-5854084206b7?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Guía de nutrición para atletas híbridos',
      description: 'Estrategias nutricionales para optimizar rendimiento en entrenamientos de fuerza y resistencia. Ejemplos de comidas y timing.',
      format: 'PDF - 18 páginas',
      price: 'Gratis',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Plan CrossFit 12 semanas - Intermedio',
      description: 'Programa estructurado para mejorar tus marcas en gimnásticos, levantamientos y metcons. Incluye ciclos de fuerza.',
      format: 'PDF - 32 páginas',
      price: '€39.99',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'Guía de recuperación y movilidad',
      description: 'Rutinas de estiramiento, foam rolling y movilidad específicas para atletas de alta intensidad. Prevención de lesiones.',
      format: 'PDF - 16 páginas',
      price: 'Gratis',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    },
    {
      id: 5,
      title: 'Plan OCR 10 semanas - Avanzado',
      description: 'Preparación específica para carreras de obstáculos. Incluye entrenamiento de grip, técnica de obstáculos y trail running.',
      format: 'PDF - 28 páginas',
      price: '€34.99',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    },
    {
      id: 6,
      title: 'Guía de suplementación inteligente',
      description: 'Qué suplementos funcionan realmente para atletas híbridos. Evidencia científica y recomendaciones de dosificación.',
      format: 'PDF - 14 páginas',
      price: 'Gratis',
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&h=400&fit=crop',
    },
  ];

  const handleDownload = (guide) => {
    if (guide.price === 'Gratis') {
      toast.success(`Descargando ${guide.title}`);
    } else {
      toast.success('Redirigiendo a la página de pago');
    }
  };

  return (
    <>
      <Helmet>
        <title>Guías - HybridRoxStore</title>
        <meta name="description" content="Planes de entrenamiento y guías descargables para atletas híbridos. Hyrox, CrossFit, OCR y más." />
      </Helmet>

      <Header />

      <main className="pt-24 pb-20">
        <div className="container-custom">
          <SectionHeader
            title="Guías y planes de entrenamiento"
            subtitle="Programas descargables creados por atletas para atletas"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                className="card-premium flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="aspect-video overflow-hidden rounded-lg mb-4 bg-muted">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={18} className="text-primary" />
                  <span className="text-sm text-muted-foreground normal-case font-normal">{guide.format}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground normal-case">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed normal-case font-normal flex-grow">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <span className="text-2xl font-bold text-primary">{guide.price}</span>
                  <Button
                    variant={guide.price === 'Gratis' ? 'secondary' : 'primary'}
                    onClick={() => handleDownload(guide)}
                    className="flex items-center gap-2"
                  >
                    <Download size={18} />
                    {guide.price === 'Gratis' ? 'Descargar' : 'Comprar'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GuiasPage;