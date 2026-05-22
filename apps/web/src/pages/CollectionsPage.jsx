import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CollectionsPage = () => {
  // Configuración de tus 5 series de autor
  const collections = [
    { num: 'I', title: 'PHOTOGRAPHIC ABSTRACTIONS 2015–2025', desc: 'A decade of abstraction through the photographic lens.', series: 'Series I' },
    { num: 'II', title: 'VISUAL EXPERIMENTS 2000–2025', desc: 'Twenty-five years of visual inquiry and experimentation.', series: 'Series II' },
    { num: 'III', title: 'URBAN PHOTOGRAPHY', desc: 'The city as subject — raw, layered, and alive.', series: 'Series III' },
    { num: 'IV', title: 'CONTEMPORARY ARCHITECTURE & INTERIORS', desc: 'Form, space, and light in the built environment.', series: 'Series IV' },
    { num: 'V', title: 'CHROMATIC CONSTRUCTS 2026', desc: 'New works exploring colour, structure, and sensation.', series: 'Series V' }
  ];

  return (
    <>
      <Helmet>
        <title>Collections | Max Carballo</title>
        <meta name="description" content="Browse curated photography and fine art series." />
      </Helmet>

      <main className="pt-40 pb-32 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          <div className="mb-24">
            <span className="section-label">Browse By</span>
            <h1 className="text-white">Collections</h1>
            <div className="text-4xl md:text-5xl red-italic mt-2">
              Archival Prints Museum Grade
            </div>
          </div>

          <div className="space-y-6">
            {collections.map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Nota: Aquí pasamos la serie exacta en la URL (?series=Series I, etc.) */}
                <Link
                  to={`/shop?series=${encodeURIComponent(item.series)}`}
                  className="group flex flex-col md:flex-row md:items-center bg-card/50 hover:bg-card border border-white/5 hover:border-white/20 p-8 md:p-10 transition-all duration-300"
                >
                  <div className="w-16 text-3xl font-serif text-muted group-hover:text-primary transition-colors">
                    {item.num}
                  </div>

                  <div className="flex-1 mt-6 md:mt-0 md:ml-12">
                    <h2 className="text-xl tracking-[0.15em] uppercase mb-3 text-white">
                      {item.title}
                    </h2>
                    <p className="text-foreground/60 text-sm font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 md:mt-0 flex items-center justify-between md:flex-col md:items-end space-y-0 md:space-y-4">
                    <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      {item.series}
                    </span>
                    <ArrowRight className="w-6 h-6 text-muted group-hover:text-primary transform group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
};

export default CollectionsPage;