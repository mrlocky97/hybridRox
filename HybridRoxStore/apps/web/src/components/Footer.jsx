import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation(['footer', 'common']);

  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-border pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand & Minimal Newsletter */}
          <div className="lg:col-span-6 flex flex-col pr-0 lg:pr-12">
            <Link 
              to="/" 
              className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-widest text-white hover:opacity-75 transition-opacity mb-6 flex flex-col"
              aria-label="HybridRoxStore Home"
            >
              <span>{t('brand.line1', 'HYBRID')}</span>
              <span>{t('brand.line2', 'ROXSTORE')}</span>
            </Link>
            
            <p className="text-base md:text-lg text-gray-400 max-w-md leading-relaxed mb-12">
              {t('brand.tagline', 'THE INTERSECTION OF STRENGTH AND ENDURANCE.')}
            </p>

            <div className="max-w-md w-full">
              <p className="text-xs text-white tracking-widest uppercase font-medium mb-4">
                {t('newsletter.label', 'SUBSCRIBE TO THE LOG')}
              </p>
              <form onSubmit={handleSubscribe} className="flex items-center border-b border-gray-700 hover:border-white focus-within:border-white transition-colors group">
                <input 
                  type="email" 
                  placeholder={t('newsletter.placeholder', 'ENTER YOUR EMAIL')} 
                  className="bg-transparent border-none text-white placeholder:text-gray-600 focus:outline-none focus:ring-0 w-full py-3 text-sm tracking-widest uppercase h-[44px]"
                  required
                />
                <button 
                  type="submit" 
                  className="text-primary hover:brightness-110 transition-all flex items-center justify-center h-[44px] px-4 -mr-4"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-8 md:gap-12 pt-2">
            <div className="flex flex-col gap-6">
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-2">Explore</p>
              <Link to="/tienda" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors flex items-center min-h-[32px]">{t('common:nav.shop', 'Shop')}</Link>
              <Link to="/about" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors flex items-center min-h-[32px]">{t('common:nav.about', 'About')}</Link>
              <Link to="/blog" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors flex items-center min-h-[32px]">{t('common:nav.blog', 'Blog')}</Link>
              <Link to="/community" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors flex items-center min-h-[32px]">{t('common:nav.community', 'Community')}</Link>
              <Link to="/contact" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors flex items-center min-h-[32px]">{t('common:nav.contact', 'Contact')}</Link>
            </div>
            
            <div className="flex flex-col gap-6">
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-2">Connect</p>
              <a href="#" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors flex items-center min-h-[32px]">{t('social.instagram', 'Instagram')}</a>
              <a href="#" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors flex items-center min-h-[32px]">{t('social.tiktok', 'TikTok')}</a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-900 gap-6">
          <p className="text-xs text-gray-500 tracking-widest uppercase">
            © {new Date().getFullYear()} HYBRIDROXSTORE. {t('legal.rights', 'ALL RIGHTS RESERVED.')}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <Link to="/privacy" className="text-xs text-gray-400 tracking-widest uppercase hover:text-white transition-colors flex items-center min-h-[32px]">{t('legal.privacy', 'Privacy')}</Link>
            <Link to="/returns" className="text-xs text-gray-400 tracking-widest uppercase hover:text-white transition-colors flex items-center min-h-[32px]">{t('legal.returns', 'Returns')}</Link>
            <Link to="/terms" className="text-xs text-gray-400 tracking-widest uppercase hover:text-white transition-colors flex items-center min-h-[32px]">{t('legal.terms', 'Terms')}</Link>
            <Link to="/cookies" className="text-xs text-gray-400 tracking-widest uppercase hover:text-white transition-colors flex items-center min-h-[32px]">{t('legal.cookies', 'Cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;