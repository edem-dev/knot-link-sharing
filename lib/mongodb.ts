// lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in .env.local')
}

// WHY A SINGLETON?
// Next.js runs API routes as serverless functions. Without this pattern,
// every incoming request opens a fresh MongoDB connection and immediately
// exhausts Atlas's connection pool (max 500 on the free tier).
//
// The singleton caches the connection on the Node.js `global` object so
// it survives across hot reloads in development and across invocations
// within the same serverless container in production.

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Extend the Node.js global type so TypeScript doesn't complain
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached

export default async function connectDB(): Promise<typeof mongoose> {
  // Already connected — reuse the existing connection
  if (cached.conn) return cached.conn

  // Connection already in progress — wait for it rather than opening another
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // bufferCommands: false means operations fail immediately if the
      // connection is not ready, rather than queuing silently.
      // Better error visibility during development.
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}