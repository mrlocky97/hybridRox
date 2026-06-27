import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import TiendaPage from './pages/TiendaPage.jsx';
import ProductoPage from './pages/ProductDetailPage.jsx';
import BundlesPage from './pages/BundlesPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import ReturnsPage from './pages/ReturnsPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import CookiesPage from './pages/CookiesPage.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import HXLoader from './components/HXLoader.jsx';
import { CartProvider } from './hooks/useCart.jsx';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  // Simulate initial app load for the new HXLoader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGlobalLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <HXLoader isLoading={isGlobalLoading}>
        <Router>
          <ScrollToTop />
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0',
              },
            }}
          />
          
          <Header setIsCartOpen={setIsCartOpen} />
          <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          
          <main className="pt-20 md:pt-24 min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/about" element={<AboutPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/contact" element={<ContactPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/tienda" element={<TiendaPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/tienda/:categoria" element={<TiendaPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/product/:id" element={<ProductoPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/producto/:id" element={<ProductoPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/bundles" element={<BundlesPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/blog" element={<BlogPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/blog/:slug" element={<BlogDetailPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/community" element={<CommunityPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/success" element={<SuccessPage setIsCartOpen={setIsCartOpen} />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<PrivacyPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/returns" element={<ReturnsPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/terms" element={<TermsPage setIsCartOpen={setIsCartOpen} />} />
              <Route path="/cookies" element={<CookiesPage setIsCartOpen={setIsCartOpen} />} />
              
              <Route path="*" element={
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4 bg-background">
                  <h1 className="mb-6">404</h1>
                  <p className="text-xl text-muted-foreground mb-12">SECTOR NOT FOUND.</p>
                  <a href="/" className="btn-brutalist">RETURN TO BASE</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </Router>
      </HXLoader>
    </CartProvider>
  );
}

export default App;