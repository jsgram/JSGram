export const GOOGLE_SCOPE_PROFILE = 'https://www.googleapis.com/auth/userinfo.profile';
export const GOOGLE_SCOPE_EMAIL = 'https://www.googleapis.com/auth/userinfo.email';

export const GOOGLE_CLIENT_ID: string = (process.env.GOOGLE_CLIENT_ID as string);
export const GOOGLE_CLIENT_SECRET: string = (process.env.GOOGLE_CLIENT_SECRET as string);
export const GOOGLE_CALLBACK_URL: string = (process.env.GOOGLE_CALLBACK_URL as string);
