import { Request, Response } from 'express';
import { handlePhotoChange } from '../../db.requests/userProfile.requests';
import { uploadImage } from '../../helpers/uploadImage';

const awsConfig = {
    bucket: 'jsgram-profile-images',
    acl: 'public-read',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    fileSize: 1024 * 1024 * 2,
};

const singleUpload = uploadImage(awsConfig).multerInstance.single('userPhoto');

export const handlePhoto = (req: Request, res: Response): void => {
    singleUpload(req, res, async (err: Error) => {
        if (err) {
            return res.status(422).send({errors: [{title: 'File upload error', detail: err.message}]});
        }
        const id = res.locals.user.id;
        const photoPath = await handlePhotoChange(req, id);
        if (photoPath.previousPhoto) {
            uploadImage(awsConfig).s3.deleteObject({
                Bucket: awsConfig.bucket,
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
