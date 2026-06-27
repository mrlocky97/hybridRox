import React, { useState } from 'react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await pb.collection('newsletter_signups').create({ email }, { $autoCancel: false });
      toast.success('Joined the movement.');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe or already registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 border-y border-border">
      <div className="container-custom max-w-4xl mx-auto text-center">
        <h2 className="mb-6">JOIN THE HYBRID MOVEMENT</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Be part of the performance revolution. No spam, only essential transmissions.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            className="input-brutalist flex-grow border-r-0 sm:border-r"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="btn-brutalist whitespace-nowrap"
          >
            {loading ? 'JOINING...' : 'SUBSCRIBE'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;