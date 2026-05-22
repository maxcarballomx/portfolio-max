import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const ArtworkCard = ({ artwork, onAddToCart, showAddToCart = false }) => {
  // 1. Obtener la imagen original sin recortes destructivos (quitamos el thumb 400x400)
  const imageUrl = artwork.image
    ? pb.files.getUrl(artwork, artwork.image)
    : 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5';

  // 2. Función inteligente para extraer tamaños, papeles y precios de tu descripción
  const variations = useMemo(() => {
    if (!artwork.description) return [];

    const lines = artwork.description.split('\n');
    let currentPaper = "Standard Archival";
    const parsedOptions = [];

    lines.forEach(line => {
      const trimmed = line.trim();

      if (trimmed.toLowerCase().startsWith('paper:')) {
        currentPaper = trimmed.replace(/paper:/i, '').trim();
      }

      if ((trimmed.startsWith('•') || trimmed.startsWith('-')) && trimmed.includes('$')) {
        const priceMatch = trimmed.match(/\$(\d+(?:\.\d+)?)/);
        if (priceMatch) {
          const parsedPrice = parseFloat(priceMatch[1]);
          const labelText = trimmed.replace(/•|-/g, '').trim();

          parsedOptions.push({
            id: `${artwork.id}-${parsedOptions.length}`,
            paper: currentPaper,
            label: `${currentPaper} — ${labelText}`,
            price: parsedPrice
          });
        }
      }
    });

    return parsedOptions;
  }, [artwork.description, artwork.id]);

  const [selectedVariant, setSelectedVariant] = useState(variations[0] || null);
  const displayPrice = selectedVariant ? selectedVariant.price : artwork.price;

  const handleCartClick = () => {
    if (selectedVariant) {
      const customArtwork = {
        ...artwork,
        title: `${artwork.title} (${selectedVariant.label.split('($')[0].trim()})`,
        price: selectedVariant.price,
      };
      onAddToCart(customArtwork);
    } else {
      onAddToCart(artwork);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-lg bg-card elegant-shadow border border-zinc-900 flex flex-col h-full">

        {/* CONTENEDOR FLEXIBLE: Ahora respeta proporciones horizontales y verticales nativas */}
        <div className="aspect-auto w-full bg-zinc-950 flex items-center justify-center p-4 min-h-[260px] md:min-h-[320px]">
          <img
            src={imageUrl}
            alt={artwork.title}
            className="max-w-full max-h-[280px] object-contain transition-transform duration-500 group-hover:scale-[1.02] elegant-shadow"
          />
        </div>

        {/* CONTENIDO DE TEXTO Y SELECTORES */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-start justify-between mb-2 gap-2">
              <h3 className="text-xl font-medium text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {artwork.title}
              </h3>
              {artwork.category && (
                <span className="text-[10px] font-mono tracking-widest uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded shrink-0">
                  {artwork.category}
                </span>
              )}
            </div>

            {artwork.description && (
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed font-light">
                {artwork.description.replace(/Series\s+[I|V]+/i, '')} {/* Limpiamos el tag técnico del texto visible */}
              </p>
            )}
          </div>

          <div>
            {/* MENÚ DESPLEGABLE INTERACTIVO */}
            {variations.length > 0 && (
              <div className="mb-5">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                  Select Format & Medium:
                </label>
                <select
                  className="w-full bg-black border border-zinc-800 text-xs text-zinc-300 rounded px-3 py-2 font-sans focus:outline-none focus:border-white transition-colors duration-200"
                  value={selectedVariant ? selectedVariant.id : ''}
                  onChange={(e) => {
                    const found = variations.find(v => v.id === e.target.value);
                    setSelectedVariant(found || null);
                  }}
                >
                  {variations.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
              <div className="flex flex-col">
                {variations.length > 0 && (
                  <span className="text-[9px] font-mono uppercase tracking-wider text-red-600 mb-0.5">
                    Current Selection
                  </span>
                )}
                <span className="text-2xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  ${displayPrice.toFixed(2)} <span className="text-xs font-sans text-zinc-500 ml-0.5">USD</span>
                </span>
              </div>

              {showAddToCart && onAddToCart && (
                <Button
                  onClick={handleCartClick}
                  size="sm"
                  className="transition-all duration-200 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-wider"
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  Add to cart
                </Button>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;