import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const HomePage = () => {
  return <>
      <Helmet>
        <title>Max Carballo | Photography & Visual Experiments</title>
        <meta name="description" content="A curated sanctuary of fine art prints where surrealism meets the architecture of dreams." />
      </Helmet>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="https://horizons-cdn.hostinger.com/d5ee2971-8c43-48c6-80ef-1e98bf612f97/denver-dawnibn2015-QTHhl.jpg" alt="Architectural geometric abstraction" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-background/45 backdrop-blur-[0px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          ease: "easeOut"
        }}>
            <h1 className="text-white mb-6 leading-none">
              Photography
            </h1>
          <div className="text-4xl md:text-7xl red-italic mb-14">
              & Visual Experiments
            </div>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-light leading-relaxed mb-16">
              A curated sanctuary of fine art prints where surrealism meets the architecture of dreams.
            </p>

            <Link to="/collections" className="group inline-flex items-center space-x-4 bg-primary text-white px-8 py-4 uppercase tracking-[0.2em] text-sm hover:bg-primary/90 transition-all duration-300">
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>
    </>;
};
export default HomePage;