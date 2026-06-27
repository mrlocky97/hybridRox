import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import NewsletterSection from '../components/NewsletterSection.jsx';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Nutrición', 'Entrenamiento', 'Recuperación', 'Mentalidad', 'Equipamiento'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const records = await pb.collection('blog_posts').getList(1, 50, {
          sort: '-created',
          $autoCancel: false
        });
        setPosts(records.items);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>The Hybrid Blog - HybridRoxStore</title>
        <meta name="description" content="Training science, nutrition protocols, and gear reviews for the hybrid athlete." />
      </Helmet>
      
      <main className="pt-32 pb-20 min-h-[100dvh]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-primary mb-4">The Hybrid Blog</h1>
            <p className="text-xl text-gray-300">Science-backed protocols, training guides, and gear reviews to help you dominate both worlds.</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-background' 
                    : 'bg-card border border-border text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="card-premium animate-pulse">
                  <div className="w-full h-48 bg-input rounded-lg mb-4"></div>
                  <div className="h-4 bg-input rounded w-1/4 mb-4"></div>
                  <div className="h-8 bg-input rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-input rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No articles found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.article 
                  key={post.id} 
                  className="card-premium flex flex-col h-full p-0 overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="aspect-video bg-input overflow-hidden relative">
                    {post.featured_image ? (
                      <img 
                        src={pb.files.getUrl(post, post.featured_image)} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                    )}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md border border-border">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span>{new Date(post.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {post.reading_time} min</span>
                    </div>
                    
                    <h3 className="text-2xl text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-gray-400 mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className="text-sm font-medium text-gray-300">{post.author}</span>
                      <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
                        Read More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <NewsletterSection />
    </>
  );
};

export default BlogPage;