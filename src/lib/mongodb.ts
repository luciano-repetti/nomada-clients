import { config } from 'dotenv';
import { join } from 'path';

// Cargar variables de entorno antes de cualquier otro import
config({ path: join(process.cwd(), '.env') });

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;


if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached: Cached = {
  conn: null,
  promise: null
};

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;