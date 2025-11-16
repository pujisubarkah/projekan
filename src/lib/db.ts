import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import fs from 'fs';
import path from 'path';

// If DATABASE_URL isn't provided in the environment (common when running
// the dev server from certain shells), try loading it from a local .env file
// so server-side routes can connect to Neon without extra dependencies.
if (!process.env.DATABASE_URL) {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const raw = fs.readFileSync(envPath, 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const idx = trimmed.indexOf('=');
        if (idx === -1) continue;
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        // remove surrounding quotes
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (key === 'DATABASE_URL' && val) {
          process.env.DATABASE_URL = val;
          break;
        }
      }
    }
  } catch (e) {
    // ignore and continue; we'll fallback to default connection string below
    // console.warn('Could not load .env:', e);
  }
}

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/marketplace';

// Create postgres client with Neon-specific settings
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  ssl: 'require', // Required for Neon
});

// Create drizzle instance
export const db = drizzle(client, { schema });

// Export for use in other files
export { client };