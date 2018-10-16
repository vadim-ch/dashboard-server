export const isProduction = process.env.NODE_ENV === 'production';

export const SESSION_SECRET = process.env['SESSION_SECRET'];

if (!SESSION_SECRET) {
  console.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}