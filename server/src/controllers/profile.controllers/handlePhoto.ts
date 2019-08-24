import { Request, Response } from 'express';
import { handlePhotoChange } from '../../db.requests/userProfile.requests';
import { uploadImage } from '../../helpers/uploadImage';
import { bucket,
         acl,
         secretAccessKey,
         accessKeyId,
         region,
         fileSize } from '../../common.constants/aws.multer.profile.constants';

const awsConfig = {
    bucket,
    acl,
    secretAccessKey,
    accessKeyId,
    region,
    fileSize,
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
