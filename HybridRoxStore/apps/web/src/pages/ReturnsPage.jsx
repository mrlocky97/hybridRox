import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const ReturnsPage = ({ setIsCartOpen }) => {
  return (
    <>
      <Helmet>
        <title>Returns - HybridRoxStore</title>
        <meta name="description" content="Return policy for HybridRoxStore." />
      </Helmet>
      <Header setIsCartOpen={setIsCartOpen} />
      <main className="pt-48 pb-32 min-h-screen">
        <div className="container-custom max-w-4xl">
          <h1 className="mb-20">RETURNS</h1>
          
          <div className="space-y-16">
            <section>
              <h2 className="text-4xl mb-6">THE POLICY</h2>
              <p className="text-muted-foreground text-lg">
                Equipment failure is unacceptable. If an item arrives compromised or fails to meet functional expectations within 30 days, we accept returns. The gear must be unused and in its original state.
              </p>
            </section>

            <section>
              <h2 className="text-4xl mb-6">PROTOCOL</h2>
              <div className="space-y-6 text-muted-foreground text-lg">
                <p>1. Initiate the return by contacting support@hybridroxstore.com with your order details.</p>
                <p>2. We will issue a return authorization and shipping instructions.</p>
                <p>3. Secure the item and dispatch it to our facility.</p>
                <p>4. Upon inspection, refunds are processed to the original payment method within standard banking timelines.</p>
              </div>
            </section>

            <section>
              <h2 className="text-4xl mb-6">EXCEPTIONS</h2>
              <p className="text-muted-foreground text-lg">
                Digital assets (training protocols, programs) are non-refundable upon delivery. Nutritional products with compromised security seals cannot be accepted due to safety regulations.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReturnsPage;