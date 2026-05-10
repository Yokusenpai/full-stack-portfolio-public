import { connectDB } from './lib/db.mjs';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import adminRoutes from './routes/admin.route.js';
import projectRoute from './routes/project.route.js';
import artworkRoute from './routes/artwork.route.js';

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

app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoute);
app.use('/api/artworks', artworkRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
