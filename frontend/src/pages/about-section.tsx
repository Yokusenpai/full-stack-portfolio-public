import {
  ArrowDown,
  Book,
  Code2,
  File,
  Gamepad2,
  GraduationCap,
  Palette,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion, type Variants } from 'framer-motion';
import { NavLink } from 'react-router';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function AboutSection() {
  const skills = [
    'MERN Stack',
    'TypeScript',
    'Python',
    'HTML/CSS',
    'JavaScript',
    'Php',
    'Data Science(Currently learning)',
  ];
  const interests = [
    { icon: Code2, label: 'Programming' },
    { icon: Palette, label: 'Digital Art' },
    { icon: Gamepad2, label: 'Game Dev' },
    { icon: Book, label: 'Reading novels/VNs' },
    // { icon: Videotape, label: 'Content Creation' },
    // { icon: Box, label: '3D Modeling' },
  ];
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-surface rounded-full text-sm font-medium text-accent border border-border">
            Welcome to my portfolio
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
          Hi, I&apos;m{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
            YOURNAME
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-2">
          Programmer, Game Developer, Digital Artist
        </p>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Hi! I'm YOURNAME, but you can call me YOURNAME <br></br>
          I'm a Full-stack web developer, game developer, and also a digital
          artist. I have a strong passion for programming and Passionate about
          building beautiful, functional, and accessible web applications as
          well as games.
        </p>

        {/* Skills */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
                className="px-4 py-2 bg-card rounded-lg text-sm font-medium border border-border transition-colors cursor-default">
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Interests
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-border">
                <interest.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{interest.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* School Progress */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-card rounded-xl border border-border">
            <GraduationCap className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium">Currently Learning</p>
              <p className="text-xs text-muted-foreground">
                Computer Science • Term 3
              </p>
              <p>University of the People • CGPA 3.01</p>
            </div>
            <div className="w-24 h-2 bg-surface rounded-full overflow-hidden ml-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                className="h-full bg-linear-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8">
              <NavLink to="/projects">View Projects</NavLink>
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="/src/assets/new_resume.pdf" download="YOURNAME's Resume">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 border-border hover:bg-surface">
                Download Resume
                <File className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
