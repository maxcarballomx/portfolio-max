import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
const PrintQualityPage = () => {
  const sections = [{
    title: "MUSEUM-GRADE SUBSTRATES",
    items: ["Archival Matte Paper (230gsm)", "Glossy Photo Paper (320gsm)", "Fine Art Cotton Rag (308gsm)", "Acid-free and OBA-free materials"]
  }, {
    title: "INK TECHNOLOGY",
    items: ["Pigment-based archival inks", "Expanded 12-color gamut", "Deep, rich D-Max for true blacks", "Guaranteed 100+ year longevity"]
  }, {
    title: "PRODUCTION PROCESS",
    items: ["Custom ICC color profiling", "Hand-inspection of every print", "Strict environmental controls", "White-glove handling protocols"]
  }, {
    title: "PACKAGING & SHIPPING",
    items: ["Museum-grade protective sleeves", "Crush-proof reinforced tubes", "Climate-controlled transit options", "Fully insured global shipping"]
  }];
  return <>
      <Helmet>
        <title>Print Quality & Materials | Max Carballo</title>
        <meta name="description" content="Learn about our museum-grade substrates, ink technology, and rigorous production standards." />
      </Helmet>

      <main className="pt-40 pb-32 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          <div className="mb-24">
            <span className="section-label">Our Standards</span>
            <h1 className="text-white mb-2">Print Quality</h1>
            <div className="text-4xl md:text-5xl red-italic">
              & Materials
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {sections.map((section, index) => <motion.div key={section.title} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="border-t border-primary/30 pt-8">
                <h3 className="text-sm tracking-[0.15em] text-primary uppercase mb-6 font-sans">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((item, i) => <li key={i} className="text-foreground/70 font-light text-sm leading-relaxed">
                      {item}
                    </li>)}
                </ul>
              </motion.div>)}
          </div>

          <div className="mt-32 p-12 bg-card border border-white/5 text-center">
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              “Today, with digital printing is very easy to make everything perfect, which is not always a great idea. Sometimes mistakes are really what makes a piece.”
            </p>
            <span className="text-xs tracking-widest text-muted uppercase">Cindy Sherman</span>
          </div>

        </div>
      </main>
    </>;
};
export default PrintQualityPage;