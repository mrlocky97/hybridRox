import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner.jsx';

const HXLoader = ({ isLoading, children }) => {
  return (
    <div className="relative w-full h-full min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="hx-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          >
            <LoadingSpinner />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 font-['Bebas_Neue'] text-xl tracking-widest text-muted-foreground uppercase"
            >
              Loading Sector
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default HXLoader;