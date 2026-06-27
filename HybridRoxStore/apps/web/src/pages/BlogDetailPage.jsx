import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const record = await pb.collection('blog_posts').getFirstListItem(`slug="${slug}"`, {
          $autoCancel: false
        });
        setPost(record);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">Artículo no encontrado</h1>
        <Link to="/blog" className="text-primary hover:underline">Volver al blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - HybridRoxStore</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      
      <main className="pt-32 pb-20 min-h-[100dvh]">
        <div className="container-custom max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-medium uppercase tracking-athletic text-sm">
            <ArrowLeft size={16} />
            Volver al blog
          </Link>
          
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{post.category}</span>
              <span className="text-sm text-muted-foreground">{post.reading_time} min lectura</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 normal-case">{post.title}</h1>
            
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-border">
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-sm text-muted-foreground">{new Date(post.created).toLocaleDateString('es-ES')}</p>
              </div>
            </div>

            {post.featured_image && (
              <div className="aspect-video bg-muted rounded-xl mb-12 overflow-hidden">
                <img src={pb.files.getUrl(post, post.featured_image)} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
          </motion.article>
        </div>
      </main>
    </>
  );
};

export default BlogDetailPage;