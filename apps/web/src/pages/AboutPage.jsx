import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
const AboutPage = () => {
  const timeline = [{
    year: '2010-2018',
    title: 'Conde Nast Mexico - Photographer collaborator'
  }, {
    year: '2015',
    title: 'First exhibition, "Photographic Abstractions"'
  }, {
    year: '2016',
    title: 'Architectural Digest Mexico article in October issue'
  }, {
    year: '2016',
    title: 'Zona Maco large format acrylic triptych Exhibition'
  }, {
    year: '2019-2021',
    title: 'Artistic Residency at Designhunter mag new house'
  }, {
    year: '2025',
    title: 'Publishing PDF Book: PHOTOGRAPHY & VISUAL EXPERIMENTS'
  }];
  return <>
      <Helmet>
        <title>About | Max Carballo</title>
      </Helmet>

      <main className="pt-40 pb-32 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          <div className="mb-24">
            <span className="section-label">About</span>
            <h1 className="text-white mb-2">The Vision</h1>
            <div className="text-4xl md:text-5xl red-italic">
              Behind the Lens
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.9
          }}>
              <img src="https://horizons-cdn.hostinger.com/d5ee2971-8c43-48c6-80ef-1e98bf612f97/retrato-gemini-oiEYN.jpg" alt="Portrait of the artist" className="w-full aspect-[4/4] opacity-72" />
            </motion.div>

            <div className="space-y-8 text-foreground/100 font-light leading-relaxed">
              <p className="text- text-white50">
                “A visual artist and professional photographer with over 25 years of experience, possessing in-depth technical training in imaging systems, color management, and editorial production processes.
              </p>
              <p>
                My career began during the technological transition from analog to digital prepress, working with critical image infrastructure for newspapers, publishers, and international agencies. My signature photographic work encompasses a range of styles, from vibrant color compositions to timeless images in both color and black & white.
              </p>
              <p>
                My vision transforms space into aesthetic experiences, exploring the boundaries between the real and the imagined through the fusion of photography and digital editing with a poetic approach.”
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-18">
            <h2 className="text-3xl mb-12">Selected Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {timeline.map((item, index) => <div key={index} className="flex flex-col space-y-2 pb-6 border-b border-white/5">
                  <span className="text-primary arial italic text-xl">{item.year}</span>
                  <span className="text-foreground/90 font-light tracking-wide">{item.title}</span>
                </div>)}
            </div>
          </div>

          <div className="mt-32 text-center">
            <p className="text-muted tracking-widest uppercase text-xs mb-4"></p>
            <a href="mailto:studio@archiveofvisions.com" className="text-2xl font-light hover:text-primary transition-colors">
            
            </a>
          </div>

        </div>
      </main>
    </>;
};
export default AboutPage;