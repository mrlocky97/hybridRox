import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const TermsPage = ({ setIsCartOpen }) => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - HybridRoxStore</title>
        <meta name="description" content="Terms of Service for HybridRoxStore." />
      </Helmet>
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="pt-48 pb-32 min-h-screen">
        <div className="container-custom max-w-4xl">
          <h1 className="mb-20">TERMS OF SERVICE</h1>
          
          <div className="space-y-16">
            <section>
              <h2 className="text-4xl mb-6">AGREEMENT</h2>
              <p className="text-muted-foreground text-lg">
                Access to and use of this platform constitutes agreement to these terms. We provide equipment and knowledge for hybrid athletes. Misuse of the platform or intellectual property is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-4xl mb-6">INTELLECTUAL PROPERTY</h2>
              <p className="text-muted-foreground text-lg">
                All visual assets, training protocols, and proprietary text remain the exclusive property of HybridRoxStore. Unauthorized distribution or replication of our digital programs will result in immediate termination of access.
              </p>
            </section>

            <section>
              <h2 className="text-4xl mb-6">LIABILITY</h2>
              <p className="text-muted-foreground text-lg">
                Physical training carries inherent risk. HybridRoxStore is not liable for injuries sustained while using our equipment or following our training protocols. Athletes assume total responsibility for their physical execution.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;