export const isProduction = process.env.NODE_ENV === 'production';

export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const MONGODB_URI = process.env['MONGODB_URI'];

if (!SESSION_SECRET) {
  console.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

if (!MONGODB_URI) {
  console.error('No mongo connection string. Set MONGODB_URI environment variable.');
  process.exit(1);
}
