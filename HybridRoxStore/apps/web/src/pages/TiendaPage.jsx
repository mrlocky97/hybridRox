import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProductsList from '../components/ProductsList.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const TiendaPage = ({ setIsCartOpen }) => {
  return (
    <>
      <Helmet>
        <title>Tienda - HybridRoxStore</title>
        <meta name="description" content="Equipamiento premium para atletas híbridos. Accesorios, nutrición, planes de entrenamiento y más." />
      </Helmet>

      <Header setIsCartOpen={setIsCartOpen} />

      <main className="pt-24 pb-20 min-h-[100dvh]">
        <div className="container-custom">
          <SectionHeader
            title="Tienda"
            subtitle="Equipamiento premium para atletas que no eligen entre fuerza y resistencia"
          />

          <ProductsList />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TiendaPage;