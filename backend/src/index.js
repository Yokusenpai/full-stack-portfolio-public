import { connectDB } from './lib/db';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import checkAdmin from './routes/admin.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());


app.use('/api/admin', checkAdmin)

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
