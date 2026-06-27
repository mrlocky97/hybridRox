import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Zap, Shield } from 'lucide-react';
import NewsletterSection from '../components/NewsletterSection.jsx';

const AboutPage = () => {
  const values = [
    { icon: Shield, title: 'Uncompromising Quality', desc: 'Gear built to withstand the rigors of both heavy lifting and endurance miles.' },
    { icon: Users, title: 'Community First', desc: 'We are athletes building for athletes. Your feedback drives our innovation.' },
    { icon: Zap, title: 'Performance Driven', desc: 'Every product is tested in the trenches before it reaches our store.' },
    { icon: Target, title: 'No Excuses', desc: 'We believe in putting in the work. Our gear is just the tool; you are the engine.' }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - HybridRoxStore</title>
        <meta name="description" content="The story behind HybridRoxStore. Built for athletes who refuse to choose between strength and endurance." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop"
              alt="Athletes training"
              className="w-full h-full object-cover opacity-40 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          </div>
          
          <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About HybridRoxStore
            </motion.h1>
            <motion.p 
              className="text-2xl text-white font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We exist for the athletes who refuse to be put in a box. The ones who deadlift heavy on Friday and run a half-marathon on Sunday.
            </motion.p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-card">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-white mb-6">The Origin Story</h2>
                <div className="prose prose-invert prose-lg text-gray-300">
                  <p>HybridRoxStore was born out of frustration. As athletes competing in both CrossFit and endurance events, we found ourselves constantly compromising on gear.</p>
                  <p>Powerlifting brands made gear that was too bulky for running. Running brands made gear that fell apart during heavy barbell work. We needed equipment that could transition seamlessly between disciplines.</p>
                  <p>So we built it. What started as a small collection of specialized grips and knee sleeves has grown into a comprehensive ecosystem for the hybrid athlete.</p>
                </div>
              </motion.div>
              <motion.div 
                className="relative aspect-square rounded-2xl overflow-hidden border border-border"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop" 
                  alt="Gym equipment" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-primary mb-4">Our Core Values</h2>
              <p className="text-gray-300 text-lg">The principles that guide every product we design and every decision we make.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <motion.div 
                  key={idx}
                  className="card-premium text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-2xl text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Placeholder */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container-custom text-center">
            <h2 className="text-white mb-12">The Team Behind The Gear</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full bg-input border-2 border-border mb-6 overflow-hidden">
                    <img src={`https://i.pravatar.cc/300?img=${i * 10}`} alt="Team member" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <h3 className="text-xl text-white mb-1">Founder Name</h3>
                  <p className="text-primary font-medium uppercase tracking-wider text-sm">Co-Founder & Athlete</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 text-center">
          <div className="container-custom max-w-3xl">
            <h2 className="text-5xl text-white mb-6">Ready to Dominate Both Worlds?</h2>
            <p className="text-xl text-gray-300 mb-10">Join thousands of athletes who have already made the switch to hybrid training.</p>
            <Link to="/community" className="btn-primary text-xl px-10 py-4">
              Join the Movement
            </Link>
          </div>
        </section>

        <NewsletterSection />
      </main>
    </>
  );
};

export default AboutPage;