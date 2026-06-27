import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import NewsletterSection from '../components/NewsletterSection.jsx';

const HomePage = () => {
  const categories = [
    { title: 'GEAR', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=800&fit=crop', link: '/tienda?categoria=accesorios' },
    { title: 'APPAREL', image: 'https://images.unsplash.com/photo-1517343985841-f8b2d6631481?w=800&h=800&fit=crop', link: '/tienda?categoria=ropa' },
    { title: 'NUTRITION', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop', link: '/tienda?categoria=nutricion' },
    { title: 'PROTOCOLS', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop', link: '/tienda?categoria=planes' }
  ];

  return (
    <>
      <Helmet>
        <title>HybridRoxStore - Performance Redefined</title>
        <meta name="description" content="Editorial gear and protocols for the hybrid athlete." />
      </Helmet>

      <main>
        {/* Editorial Hero */}
        <section className="relative h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] w-full flex items-end pb-32">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1650845494749-c2f8e385f6e6?w=1920&h=1080&fit=crop"
              alt="Athlete"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-background/60"></div>
          </div>
          
          <div className="container-custom relative z-10 w-full">
            <h1 className="text-white mb-6 max-w-5xl">PERFORMANCE REDEFINED</h1>
            <p className="text-2xl text-gray-300 max-w-2xl mb-12 uppercase tracking-widest font-medium">
              FOR THOSE WHO REFUSE TO CHOOSE BETWEEN STRENGTH AND ENDURANCE.
            </p>
            <Link to="/tienda" className="btn-brutalist">
              EXPLORE COLLECTION
            </Link>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-32">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((cat, idx) => (
                <Link key={idx} to={cat.link} className="group relative aspect-[4/3] block overflow-hidden bg-card border border-border">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/40 transition-colors"></div>
                  <div className="absolute inset-0 p-8 flex items-end">
                    <h2 className="text-5xl text-white group-hover:text-primary transition-colors">{cat.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest From Movement - Editorial Preview */}
        <section className="py-32 bg-card border-y border-border">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-6xl">THE LOG</h2>
              <Link to="/blog" className="text-lg font-['Bebas_Neue'] tracking-widest uppercase hover:text-primary transition-colors pb-2 border-b-2 border-transparent hover:border-primary">
                VIEW ALL LOGS
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <article className="group cursor-pointer">
                <div className="aspect-[16/9] mb-8 overflow-hidden bg-background border border-border">
                  <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&h=800&fit=crop" alt="Training" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">TRAINING</span>
                  <span className="text-xs text-muted-foreground tracking-widest">MAY 15, 2026</span>
                </div>
                <h3 className="text-4xl mb-4 group-hover:text-primary transition-colors">THE PROTOCOL: PEAKING FOR HYROX</h3>
                <p className="text-muted-foreground text-lg">A meticulous breakdown of the final 4 weeks leading into race day. Managing fatigue while sharpening the engine.</p>
              </article>

              <article className="group cursor-pointer">
                <div className="aspect-[16/9] mb-8 overflow-hidden bg-background border border-border">
                  <img src="https://images.unsplash.com/photo-1612498542013-3b90aefe7773?w=1000&h=800&fit=crop" alt="Nutrition" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">NUTRITION</span>
                  <span className="text-xs text-muted-foreground tracking-widest">MAY 10, 2026</span>
                </div>
                <h3 className="text-4xl mb-4 group-hover:text-primary transition-colors">FUELING THE HYBRID MACHINE</h3>
                <p className="text-muted-foreground text-lg">Carbohydrate periodization strategies for athletes combining heavy lifts with extreme endurance efforts.</p>
              </article>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
    </>
  );
};

export default HomePage;