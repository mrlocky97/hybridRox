import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const BlogListPage = ({ setIsCartOpen }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const records = await pb.collection('blog_posts').getFullList({
          sort: '-created',
          $autoCancel: false
        });
        setPosts(records);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog - HybridRoxStore</title>
        <meta name="description" content="Artículos, guías y ciencia para el atleta híbrido." />
      </Helmet>
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="pt-32 pb-20 min-h-[100dvh]">
        <div className="container-custom">
          <SectionHeader title="El Blog Híbrido" subtitle="Ciencia, entrenamiento y mentalidad para dominar ambos mundos." />
          
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Cargando artículos...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No hay artículos publicados todavía.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {posts.map((post, i) => (
                <motion.div key={post.id} className="card-premium flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    {post.featured_image ? (
                      <img src={pb.files.getUrl(post, post.featured_image)} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sin imagen</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs text-muted-foreground">• {post.reading_time} min lectura</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-primary font-bold uppercase tracking-athletic hover:underline mt-auto">
                    Leer artículo →
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogListPage;