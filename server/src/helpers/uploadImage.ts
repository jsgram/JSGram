import { Request } from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

interface IAWSConfig {
    bucket: string;
    acl: string;
    secretAccessKey: string | undefined;
    accessKeyId: string | undefined;
    region: string | undefined;
    fileSize: number;
}

export const uploadImage = ({
    bucket,
    acl,
    secretAccessKey,
    accessKeyId,
    region,
    fileSize}: IAWSConfig): {multerInstance: multer.Instance, s3: AWS.S3} => {

    aws.config.update({
        secretAccessKey,
        accessKeyId,
        region,
    });

    const s3 = new aws.S3();

    const fileFilter = (req: Request, file: Express.Multer.File,
                        cb: (error: Error | null, acceptFile: boolean) => void): void => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Please, choose an image in a JPEG or PNG format.'), false);
        }
    };

    const multerInstance = multer({
        fileFilter,
        limits: { fileSize },
        storage: multerS3({
            s3,
            bucket,
            acl,
            key: (req: Request, file: Express.Multer.File,
                  cb: (error: Error | null, key: string) => void): void => {
                cb(null, Date.now().toString());
            },
        }),
    });
    return { multerInstance, s3 };
};
