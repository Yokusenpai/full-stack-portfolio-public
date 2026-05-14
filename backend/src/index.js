import { connectDB } from './lib/db.mjs';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import fileUpload from 'express-fileupload';
import adminRoutes from './routes/admin.route.js';
import projectRoute from './routes/project.route.js';
import artworkRoute from './routes/artwork.route.js';
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

app.use('/api/auth', authRoutes);
app.use('/api/admin', protectRoute, adminRoutes);
app.use('/api/projects', projectRoute);
app.use('/api/artworks', artworkRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
