import { Request, Response } from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { handlePhotoChange } from '../../db.requests/userProfile.requests';

const bucket = 'jsgram-profile-images';
const acl = 'public-read';

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
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

const upload = multer({
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 2 },
    storage: multerS3({
        s3,
        bucket,
        acl,
        metadata: (req: Request, file: Express.Multer.File,
                   cb: (error: Error | null, metadata: any) => void): void => {
            cb(null, {userID: req.body.id});
        },
        key: (req: Request, file: Express.Multer.File,
              cb: (error: Error | null, key: string) => void): void => {
            cb(null, Date.now().toString());
        },
    }),
});

const singleUpload = upload.single('userPhoto');

export const handlePhoto = (req: Request, res: Response): void => {
    singleUpload(req, res, async (err: Error) => {
        if (err) {
            return res.status(422).send({errors: [{title: 'File upload error', detail: err.message}]});
        }
        const id = res.locals.user.id;
        const photoPath = await handlePhotoChange(req, id);
        if (photoPath.previousPhoto) {
            s3.deleteObject({
                Bucket: bucket,
                Key: photoPath.previousPhoto,
            }, (error: Error, data: any): void => {
                if (error) {
                    throw new Error(error.message);
                }
            });
        }
        const status = photoPath.newPhoto ? 'Photo was successfully uploaded' : 'Photo was successfully deleted';
        res.json({ status, photoPath: photoPath.newPhoto });
    });
};
