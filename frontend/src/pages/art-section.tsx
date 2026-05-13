import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBigDown, X, ZoomIn } from 'lucide-react';
import type { Artwork } from '../types';
import { useArtworkStore } from '../store/useArtworkStore';
import { Skeleton } from '../components/ui/skeleton';

export function ArtworkCard({
  artwork,
  onClick,
}: {
  artwork: Artwork;
  onClick: () => void;
}) {
  const heightClass = {
    portrait: 'row-span-2',
    landscape: 'col-span-2',
    square: '',
  }[artwork.aspectRatio];
  const [isImgLoading, setImgLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${heightClass}`}>
      <div className="relative w-full h-full min-h-50">
        {isImgLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
        )}
        <img
          src={artwork.imageUrl}
          onLoad={() => setImgLoading(false)}
          alt={`Artwork ${artwork._id}`}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${
            isImgLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Artistic Overlay Effect */}
        <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Colored border glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/50 ring-offset-2 ring-offset-background" />
        </div>

        {/* Zoom Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-4 bg-background/80 backdrop-blur-sm rounded-full">
            <ZoomIn className="h-6 w-6 text-foreground" />
          </div>
        </motion.div>

        {/* Artistic corner accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

function Lightbox({
  artwork,
  onClose,
}: {
  artwork: Artwork;
  onClose: () => void;
}) {
  const handleDownload = async () => {
    try {
      const response = await fetch(artwork.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `Artwork ${artwork._id}`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4">
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 left-6 p-3 bg-surface rounded-full border border-border hover:bg-card transition-colors"
        aria-label="Download current art">
        <ArrowBigDown className="h-6 w-6" />
      </motion.button>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 right-6 p-3 bg-surface rounded-full border border-border hover:bg-card transition-colors"
        aria-label="Close lightbox">
        <X className="h-6 w-6" />
      </motion.button>

      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        src={artwork.imageUrl}
        alt={`Artwork ${artwork._id}`}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
      />
    </motion.div>
  );
}

export function ArtSection() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const { artworks, fetchArtworks, error, isLoading } = useArtworkStore();

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  if (error) {
    return (
      <section id="art" className="py-20 px-4 bg-surface/30">
        <div className="max-w-6xl mx-auto text-center">
          <p>Error loading artworks: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="art" className="py-20 px-4 bg-surface/30 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-card rounded-full text-sm font-medium text-accent border border-border mb-4">
            My Artworks
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Art{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-primary">
              Gallery
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A collection of drawings i've made along my digital art journey.
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {isLoading
            ? Array.from({ length: artworks.length }).map((_, i) => (
                <Skeleton key={i} />
              ))
            : artworks.map((artwork: Artwork) => (
                <ArtworkCard
                  key={artwork._id}
                  artwork={artwork}
                  onClick={() => setSelectedArtwork(artwork)}
                />
              ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedArtwork && (
          <Lightbox
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ArtSection;
