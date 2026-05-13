'use client';

import { motion } from 'framer-motion';
import { Construction, Gamepad2 } from 'lucide-react';

const mockGames = [
  {
    id: 1,
    title: '...',
    image:
      'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: '....',
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: '...',
    image:
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop',
  },
];

function MockGameCard({ game }: { game: (typeof mockGames)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-card rounded-2xl overflow-hidden border border-border group">
      {/* Blurred Image */}
      <div className="relative aspect-video">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover blur-sm brightness-50"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card to-transparent" />

        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Gamepad2 className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
            <span className="text-sm font-medium text-muted-foreground">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-muted-foreground">
          {game.title}
        </h3>
        <div className="mt-2 flex gap-2">
          <span className="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground">
            In Development
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function GamesSection() {
  return (
    <section id="games" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-surface rounded-full text-sm font-medium text-primary border border-border mb-4">
            Game Development
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Games{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              & Experiments
            </span>
          </h2>
        </motion.div>

        {/* In Development Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 mb-12 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-4">
            <Construction className="h-16 w-16 text-accent" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-3">
            This section is currently in development.
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            I&apos;m working on some exciting games that will be showcased here
            soon. Check back later for playable demos and game experiments!
          </p>
        </motion.div>

        {/* Mock Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGames.map((game) => (
            <MockGameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GamesSection;
