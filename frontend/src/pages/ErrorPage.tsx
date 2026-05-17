import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12">
      <h1 className="mt-48 text-3xl sm:text-6xl md:text-9xl font-bold mb-4 text-balance">
        4
        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
          04
        </span>
          </h1>
          <p>The page you are looking for does not exist</p>
    </motion.div>
  );
};

export default ErrorPage;
