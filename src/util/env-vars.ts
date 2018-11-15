export const isProduction = process.env.NODE_ENV === 'production';

export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const EMAIL_SIGNIN_SECRET = process.env['EMAIL_SIGNIN_SECRET'];

if (!SESSION_SECRET) {
  console.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

if (!EMAIL_SIGNIN_SECRET) {
  console.error('No client secret. Set EMAIL_SIGNIN_SECRET environment variable.');
  process.exit(1);
}
