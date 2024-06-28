import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable must be set!');
}

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/db/schema.ts',
	out: './src/lib/db/migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL
	}
});
