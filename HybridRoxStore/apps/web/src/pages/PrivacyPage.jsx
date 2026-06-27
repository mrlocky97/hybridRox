import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const PrivacyPage = ({ setIsCartOpen }) => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - HybridRoxStore</title>
        <meta name="description" content="Privacy Policy for HybridRoxStore." />
      </Helmet>
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="pt-48 pb-32 min-h-screen">
        <div className="container-custom max-w-4xl">
          <h1 className="mb-20">PRIVACY POLICY</h1>
          
          <div className="space-y-16">
            <section>
              <h2 className="text-4xl mb-6">1. DATA COLLECTION</h2>
              <p className="text-muted-foreground text-lg">
                We operate on a principle of minimal data collection. We only ask for what is strictly necessary to process your orders and facilitate your interaction with the platform. This includes contact information, shipping details, and encrypted payment data processed by secure gateways.
              </p>
            </section>

            <section>
              <h2 className="text-4xl mb-6">2. DATA USAGE</h2>
              <p className="text-muted-foreground text-lg">
                Your data is utilized solely for order fulfillment, vital communications, and platform security. We do not sell, trade, or otherwise exploit your personal information. If you opt into our community transmissions, your email will be used exclusively for that purpose.
              </p>
            </section>

            <section>
              <h2 className="text-4xl mb-6">3. YOUR RIGHTS</h2>
              <p className="text-muted-foreground text-lg">
                You maintain absolute sovereignty over your personal data. Under standard regulations (including GDPR), you reserve the right to access, rectify, or demand the complete erasure of your information from our systems. Submit formal requests to privacy@hybridroxstore.com.
              </p>
            </section>

            <section>
              <h2 className="text-4xl mb-6">4. RETENTION</h2>
              <p className="text-muted-foreground text-lg">
                Data is retained only as long as operationally necessary or mandated by law. Outdated or unnecessary information is systematically purged from our active databases.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;