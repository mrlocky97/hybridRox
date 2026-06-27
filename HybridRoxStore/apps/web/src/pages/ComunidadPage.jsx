import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Trophy, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Button from '../components/Button.jsx';

const ComunidadPage = () => {
  const stats = [
    { icon: Users, value: '2,847', label: 'Miembros activos' },
    { icon: MessageCircle, value: '1,234', label: 'Conversaciones mensuales' },
    { icon: Trophy, value: '487', label: 'Competiciones completadas' },
    { icon: TrendingUp, value: '94%', label: 'Mejoran sus marcas' },
  ];

  const discussions = [
    {
      id: 1,
      title: '¿Cómo mejorar el tiempo en SkiErg?',
      author: 'Marta Jiménez',
      replies: 23,
      lastActivity: 'Hace 2 horas',
      category: 'Hyrox',
    },
    {
      id: 2,
      title: 'Progresión de muscle-ups: mi experiencia',
      author: 'Carlos Ruiz',
      replies: 47,
      lastActivity: 'Hace 5 horas',
      category: 'CrossFit',
    },
    {
      id: 3,
      title: 'Preparación para Spartan Beast: consejos',
      author: 'Laura Sánchez',
      replies: 31,
      lastActivity: 'Hace 1 día',
      category: 'OCR',
    },
    {
      id: 4,
      title: 'Ciclo de fuerza: ¿5x5 o 5/3/1?',
      author: 'Miguel Torres',
      replies: 56,
      lastActivity: 'Hace 1 día',
      category: 'Fuerza',
    },
    {
      id: 5,
      title: 'Nutrición pre-competición: qué funciona',
      author: 'Ana Rodríguez',
      replies: 38,
      lastActivity: 'Hace 2 días',
      category: 'Nutrición',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Webinar: Programación para Hyrox',
      date: '2026-05-18',
      time: '19:00 CET',
      type: 'Online',
    },
    {
      id: 2,
      title: 'Meetup Madrid: Entrenamiento grupal',
      date: '2026-05-22',
      time: '10:00 CET',
      type: 'Presencial',
    },
    {
      id: 3,
      title: 'Q&A con atleta élite Hyrox',
      date: '2026-05-25',
      time: '20:00 CET',
      type: 'Online',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Comunidad - HybridRoxStore</title>
        <meta name="description" content="Únete a la comunidad de atletas híbridos. Comparte experiencias, aprende y mejora junto a otros deportistas." />
      </Helmet>

      <Header />

      <main className="pt-24 pb-20">
        <div className="container-custom">
          <SectionHeader
            title="Comunidad"
            subtitle="Conecta con atletas que entrenan como tú. Comparte, aprende y mejora."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="card-premium text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <stat.icon size={32} className="text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground normal-case font-normal">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Conversaciones destacadas</h2>
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    className="card-premium hover:border-primary/50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide rounded">
                            {discussion.category}
                          </span>
                          <span className="text-sm text-muted-foreground normal-case font-normal">
                            {discussion.lastActivity}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 normal-case">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="normal-case font-normal">Por {discussion.author}</span>
                          <span className="flex items-center gap-1 normal-case font-normal">
                            <MessageCircle size={14} />
                            {discussion.replies} respuestas
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-muted-foreground flex-shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Próximos eventos</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="card-premium"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground normal-case font-normal">
                        {new Date(event.date).toLocaleDateString('es-ES', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} · {event.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 normal-case">
                      {event.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-card border border-border text-xs font-semibold uppercase tracking-wide rounded">
                      {event.type}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Users size={48} className="text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Únete a la comunidad</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto normal-case font-normal leading-relaxed">
              Accede a conversaciones exclusivas, eventos en vivo, descuentos en productos y conecta con atletas de tu nivel.
            </p>
            <Button variant="primary">
              Unirme ahora
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ComunidadPage;