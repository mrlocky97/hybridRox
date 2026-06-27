import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const CookiesPage = ({ setIsCartOpen }) => {
  return (
    <>
      <Helmet>
        <title>Cookies - HybridRoxStore</title>
        <meta name="description" content="Cookie policy for HybridRoxStore." />
      </Helmet>
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="pt-48 pb-32 min-h-screen">
        <div className="container-custom max-w-4xl">
          <h1 className="mb-20">COOKIE POLICY</h1>
          
          <div className="space-y-16">
            <section>
              <h2 className="text-4xl mb-6">FUNCTIONAL UTILITY</h2>
              <p className="text-muted-foreground text-lg">
                We deploy essential cookies exclusively to maintain platform integrity, manage cart states, and facilitate secure transactions. These are non-negotiable for baseline functionality.
              </p>
            </section>

            <section>
              <h2 className="text-4xl mb-6">ANALYTICAL DEPLOYMENT</h2>
              <p className="text-muted-foreground text-lg">
                Anonymized tracking is utilized strictly to monitor system performance and identify infrastructural friction. No individual movement is recorded for third-party commercial exploitation.
              </p>
            </section>

            <section>
              <h2 className="text-4xl mb-6">CONTROL</h2>
              <p className="text-muted-foreground text-lg">
                Browser-level controls dictate your cookie exposure. Restricting essential cookies will severely degrade your ability to interface with the platform and execute orders.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CookiesPage;