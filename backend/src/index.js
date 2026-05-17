import { connectDB } from './lib/db.mjs';
import express from 'express';
import path from 'path';
import cron from 'node-cron';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import fileUpload from 'express-fileupload';
import adminRoutes from './routes/admin.route.js';
import projectRoute from './routes/project.route.js';
import artworkRoute from './routes/artwork.route.js';
import resumeRoute from './routes/resume.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/auth.middleware.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB  max file size
    },
  }),
);

// cron job
const tempDir = path.join(process.cwd(), 'tmp');
cron.schedule('0 * * * *', () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) return console.log('error ', err);

      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {});
      }
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', protectRoute, adminRoutes);
app.use('/api/resume', resumeRoute);
app.use('/api/projects', projectRoute);
app.use('/api/artworks', artworkRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  // Use a safe catch-all that avoids path-to-regexp parsing issues
  app.get('/.*/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
