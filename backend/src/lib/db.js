import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongo db successfully connected', conn.connection.host);
  } catch (error) {
    console.log('failed to connect to mongoDB', error);
    process.exit(1);
  }
};
