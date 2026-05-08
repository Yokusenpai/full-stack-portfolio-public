'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface Artwork {
  id: number;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
}

const artworks: Artwork[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop',
    aspectRatio: 'portrait',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=600&fit=crop',
    aspectRatio: 'landscape',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=600&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop',
    aspectRatio: 'landscape',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=800&fit=crop',
    aspectRatio: 'portrait',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600&h=600&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&h=600&fit=crop',
    aspectRatio: 'landscape',
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1573096108468-702f6014ef28?w=600&h=800&fit=crop',
    aspectRatio: 'portrait',
  },
];

function ArtworkCard({
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${heightClass}`}>
      <div className="relative w-full h-full min-h-[200px]">
        <img
          src={artwork.image}
          alt={`Artwork ${artwork.id}`}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />

        {/* Artistic Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

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
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4">
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
        src={artwork.image}
        alt={`Artwork ${artwork.id}`}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
      />
    </motion.div>
  );
}

export function ArtSection() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <section id="art" className="py-20 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-card rounded-full text-sm font-medium text-accent border border-border mb-4">
            Creative Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Art{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Gallery
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A collection of digital artwork, illustrations, and creative
            experiments.
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
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