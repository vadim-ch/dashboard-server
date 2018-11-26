export const isProduction = process.env.NODE_ENV === 'production';

export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const EMAIL_SIGNIN_SECRET = process.env['EMAIL_SIGNIN_SECRET'];
export const CLIENT_URL = process.env['CLIENT_URL'];
export const MAIN_EMAIL_LOGIN = process.env['MAIN_EMAIL_LOGIN'];
export const MAIN_EMAIL_PASSWORD = process.env['MAIN_EMAIL_PASSWORD'];

if (!SESSION_SECRET) {
  console.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

if (!EMAIL_SIGNIN_SECRET) {
  console.error('No client secret. Set EMAIL_SIGNIN_SECRET environment variable.');
  process.exit(1);
}


if (!CLIENT_URL) {
  console.error('No CLIENT_URL. Set CLIENT_URL environment variable.');
  process.exit(1);
}


if (!MAIN_EMAIL_LOGIN || !MAIN_EMAIL_PASSWORD) {
  console.error('No MAIN_EMAIL_LOGIN or MAIN_EMAIL_PASSWORD');
  process.exit(1);
}
