import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const faqs = [
  { q: '¿Cuánto tarda el envío?', a: 'Los envíos a península tardan entre 24 y 48 horas laborables. Para Baleares, Canarias y resto de Europa, entre 3 y 5 días laborables.' },
  { q: '¿Puedo devolver un producto?', a: 'Sí, tienes 30 días para devolver cualquier producto sin usar y en su embalaje original. Los gastos de devolución corren por nuestra cuenta en el primer cambio de talla.' },
  { q: '¿Los planes de entrenamiento son para principiantes?', a: 'Tenemos planes escalados para todos los niveles. Cada guía especifica claramente el nivel recomendado (Principiante, Intermedio, Avanzado).' },
  { q: '¿Hacéis envíos internacionales?', a: 'Actualmente enviamos a toda la Unión Europea. Estamos trabajando para abrir envíos a Latinoamérica próximamente.' }
];

const FAQPage = ({ setIsCartOpen }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <Helmet>
        <title>Preguntas Frecuentes - HybridRoxStore</title>
        <meta name="description" content="Resuelve tus dudas sobre envíos, devoluciones, productos y planes de entrenamiento." />
      </Helmet>
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="pt-32 pb-20 min-h-[100dvh]">
        <div className="container-custom max-w-3xl">
          <SectionHeader title="Preguntas Frecuentes" subtitle="Todo lo que necesitas saber sobre nuestros productos y servicios." />
          
          <div className="space-y-4 mt-12">
            {faqs.map((faq, index) => (
              <div key={index} className="card-premium p-0 overflow-hidden">
                <button
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-lg text-foreground">{faq.q}</span>
                  <ChevronDown className={`text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-muted-foreground border-t border-border/50 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQPage;