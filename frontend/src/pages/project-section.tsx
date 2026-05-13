import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';

import type { Project } from '../types';
import { useProjectStore } from '../store/useProjectStore';

function ProjectSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border">
      <Skeleton className="w-full h-48" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isImgLoading, setImgLoading] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/50">
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent" />
        <div className="absolute -inset-px bg-linear-to-br from-accent/20 via-transparent to-primary/20 rounded-2xl blur-sm" />
      </div>

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {isImgLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
        )}
        <img
          src={project.imageUrl}
          alt={project.title}
          onLoad={() => setImgLoading(false)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            isImgLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-accent text-accent-foreground rounded-lg shadow-lg"
              aria-label={`View ${project.title} live`}>
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-surface text-foreground rounded-lg shadow-lg border border-border"
              aria-label={`View ${project.title} source code`}>
              <Github className="h-4 w-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5">
        <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-surface rounded-full text-muted-foreground border border-border">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { fetchProjects, error, isLoading, projects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (error) {
    return (
      <section id="art" className="py-20 px-4 bg-surface/30">
        <div className="max-w-6xl mx-auto text-center">
          <p>Error loading Projects: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-surface rounded-full text-sm font-medium text-primary border border-border mb-4">
            My Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A collection of projects I&apos;ve built, ranging from responsive
            web applications to creative experiments.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: projects.length }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))
            : projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
