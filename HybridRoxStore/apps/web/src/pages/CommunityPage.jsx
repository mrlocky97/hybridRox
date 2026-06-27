import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient.js';
import NewsletterSection from '../components/NewsletterSection.jsx';

const CommunityPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const records = await pb.collection('testimonials').getList(1, 4, {
          sort: '-created',
          $autoCancel: false
        });
        setStories(records.items);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Community - HybridRoxStore</title>
        <meta name="description" content="The Hybrid Movement. Athlete stories and culture." />
      </Helmet>
      
      <main className="pt-48">
        <section className="container-custom mb-32">
          <h1 className="mb-8">THE MOVEMENT</h1>
          <p className="text-2xl text-muted-foreground max-w-3xl">
            A COALITION OF ATHLETES REFUSING TO SPECIALIZE. WE BUILD STRENGTH, WE ENDURE DISTANCE, WE REJECT LIMITATIONS.
          </p>
        </section>

        <section className="container-custom mb-32">
          <h2 className="mb-16">ATHLETE NARRATIVES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {stories.length > 0 ? stories.map((story) => (
              <article key={story.id} className="flex flex-col group">
                <div className="aspect-square bg-card overflow-hidden mb-8 border border-border">
                  {story.photo ? (
                    <img 
                      src={pb.files.getUrl(story, story.photo)} 
                      alt={story.athlete_name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-8xl font-['Bebas_Neue']">
                      {story.athlete_name.substring(0,2).toUpperCase()}
                    </div>
                  )}
                </div>
                <h3 className="text-3xl mb-2">{story.athlete_name}</h3>
                {story.achievement && <p className="text-primary font-medium tracking-widest uppercase text-sm mb-6">{story.achievement}</p>}
                <p className="text-muted-foreground text-lg italic border-l-2 border-primary pl-6">
                  {story.quote}
                </p>
              </article>
            )) : (
              <p className="text-muted-foreground text-xl">Loading records...</p>
            )}
          </div>
        </section>

        <section className="container-custom mb-32 text-center border-y border-border py-24">
          <h2 className="mb-8">SHARE YOUR JOURNEY</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Document the work. Tag us in your training logs and competition results.
          </p>
          <div className="flex justify-center gap-12">
            <a href="#" className="text-xl font-['Bebas_Neue'] tracking-widest hover:text-primary transition-colors">FOLLOW ON INSTAGRAM</a>
            <a href="#" className="text-xl font-['Bebas_Neue'] tracking-widest hover:text-primary transition-colors">FOLLOW ON TIKTOK</a>
          </div>
        </section>

        <NewsletterSection />
      </main>
    </>
  );
};

export default CommunityPage;