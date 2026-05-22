import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import ArtworkCard from '@/components/ArtworkCard';
import CartSidebar from '@/components/CartSidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/contexts/CartContext';
import pb from '@/lib/pocketbaseClient';

const ShopPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart } = useCart();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeSeries = queryParams.get('series') || 'All';

  const collectionTitles = {
    'Series I': { num: 'I', title: 'PHOTOGRAPHIC ABSTRACTIONS 2015–2025' },
    'Series II': { num: 'II', title: 'VISUAL EXPERIMENTS 2000–2025' },
    'Series III': { num: 'III', title: 'URBAN PHOTOGRAPHY' },
    'Series IV': { num: 'IV', title: 'CONTEMPORARY ARCHITECTURE & INTERIORS' },
    'Series V': { num: 'V', title: 'CHROMATIC CONSTRUCTS 2026' },
    'All': { num: '—', title: 'FINE ART PORTFOLIO' }
  };

  const currentHeader = collectionTitles[activeSeries] || collectionTitles['All'];

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const records = await pb.collection('artworks').getFullList({
          sort: '-created',
          $autoCancel: false
        });
        setArtworks(records);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        toast.error('Failed to load artworks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // FILTRADO ULTRA-PRECISO: Usa límites de palabra (\b) para que Series I no se mezcle con Series II, III, IV o V
  const filteredArtworks = artworks.filter((artwork) => {
    if (activeSeries === 'All') return true;

    if (!artwork.description) return false;

    // Creamos una expresión regular estricta. Ej: /\bSeries I\b/i
    const regex = new RegExp(`\\b${activeSeries}\\b`, 'i');

    // Evaluamos directamente sobre la descripción donde guardas el tag del autor
    return regex.test(artwork.description);
  });

  const handleAddToCart = (artwork) => {
    addToCart(artwork);
    toast.success('Added to cart');
    setCartOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{currentHeader.title} | Max Carballo</title>
        <meta name="description" content={`Browse ${currentHeader.title} by Max Carballo.`} />
      </Helmet>

      <Header />

      <main className="pt-40 pb-32 min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* ENCABEZADO EXCLUSIVO DE LA COLECCIÓN SELECCIONADA */}
          <div className="mb-20 border-b border-zinc-900 pb-10">
            <div className="flex items-center gap-6 mb-2">
              {activeSeries !== 'All' && (
                <span className="text-3xl font-serif text-red-600">
                  {currentHeader.num}
                </span>
              )}
              <span className="section-label !mb-0 tracking-[0.25em]">
                {activeSeries === 'All' ? 'Curated Gallery' : 'Collection Series'}
              </span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl tracking-[0.18em] uppercase font-sans font-light">
              {currentHeader.title}
            </h1>
            <div className="text-xl md:text-2xl red-italic mt-3">
              Archival Prints Museum Grade
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square bg-zinc-900 rounded-lg" />
                  <Skeleton className="h-6 bg-zinc-900 w-3/4" />
                  <Skeleton className="h-4 bg-zinc-900 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  showAddToCart={true}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-zinc-900 rounded-lg bg-zinc-950/30">
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                No artworks published in this series yet.
              </p>
            </div>
          )}
        </div>
      </main>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      {/* ¡Footer eliminado con éxito de esta sección! 
        Ahora hereda el Footer global de App.jsx de forma limpia y sin duplicarse.
      */}
    </>
  );
};

export default ShopPage;