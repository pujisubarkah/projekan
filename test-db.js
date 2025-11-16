import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';

config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL not found in environment variables');
  process.exit(1);
}

console.log('Testing database connection...');
console.log('Connection string:', connectionString.replace(/:[^:]*@/, ':***@'));

const client = postgres(connectionString, {
  ssl: 'require',
  connection: {
    application_name: 'marketplace-test'
  }
});

const db = drizzle(client);

async function testConnection() {
  try {
    console.log('Attempting to connect...');

    // Simple query to test connection
    const result = await client`SELECT 1 as test`;
    console.log('Connection successful!');
    console.log('Test query result:', result);

    // Try to get database info
    const dbInfo = await client`SELECT current_database(), current_user, version()`;
    console.log('Database info:', dbInfo[0]);

    console.log('✅ Database connection test passed!');
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('Details:', error);
  } finally {
    await client.end();
    process.exit(0);
  }
}

testConnection();