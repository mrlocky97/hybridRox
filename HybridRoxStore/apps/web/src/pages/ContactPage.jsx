import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pb.collection('contact_submissions').create({
        ...formData,
        status: 'new'
      }, { $autoCancel: false });
      
      toast.success('Transmission received.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Transmission failed. Retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact - HybridRoxStore</title>
        <meta name="description" content="Contact the HybridRoxStore team." />
      </Helmet>
      
      <main className="pt-48 pb-32 min-h-screen">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="mb-6">GET IN TOUCH</h1>
          <p className="text-2xl text-muted-foreground mb-20 max-w-2xl">
            DIRECT LINE TO OUR OPERATIONS TEAM.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label htmlFor="name" className="text-sm font-medium tracking-widest uppercase">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-brutalist"
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="email" className="text-sm font-medium tracking-widest uppercase">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-brutalist"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <label htmlFor="subject" className="text-sm font-medium tracking-widest uppercase">Subject</label>
              <input
                id="subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="input-brutalist"
              />
            </div>
            
            <div className="space-y-4">
              <label htmlFor="message" className="text-sm font-medium tracking-widest uppercase">Message</label>
              <textarea
                id="message"
                required
                rows={8}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="input-brutalist resize-none"
              />
            </div>
            
            <button type="submit" className="btn-brutalist w-full" disabled={loading}>
              {loading ? 'SENDING...' : 'SUBMIT TRANSMISSION'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ContactPage;