export const acl: string = 'public-read';
export const bucket: string = 'jsgram-profile-images1';
export const secretAccessKey: string = process.env.AWS_SECRET_ACCESS_KEY as string;
export const accessKeyId: string = process.env.AWS_ACCESS_KEY_ID as string;
export const region: string = process.env.AWS_REGION as string;
export const fileSize: number = 1024 * 1024 * 2;
