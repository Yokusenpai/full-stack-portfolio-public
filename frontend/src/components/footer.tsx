import { motion } from 'framer-motion';
import { Github, Mail, Linkedin } from 'lucide-react';
import logo from '../../portfolio.svg';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/',
    icon: Github,
  },
  {
    name: 'Email',
    href: 'mailto:YOURGMAIL@gmail.com',
    icon: Mail,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: Linkedin,
  },
  /* {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/yourbskyprofile.bsky.social',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  }, */
];

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <img className="w-10 h-10" src={logo} alt="logo" />
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-surface rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
                  aria-label={link.name}>
                  <Icon />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            YOURNAME's Portfolio &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
