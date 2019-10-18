import { Request, Response, NextFunction } from 'express';
import { handlePhotoChange } from '../../../db.requests/userProfile.requests';
import { uploadImage } from '../../../helpers/uploadImage';
import { bucket,
         acl,
         secretAccessKey,
         accessKeyId,
         region,
         fileSize } from '../../../common.constants/aws.multer.profile.constants';

const awsConfig = {
    bucket,
    acl,
    secretAccessKey,
    accessKeyId,
    region,
    fileSize,
};

const singleUpload = uploadImage(awsConfig).multerInstance.single('userPhoto');

export const handlePhoto = (req: Request, res: Response, next: NextFunction): void => {
    singleUpload(req, res, async (err: Error) => {
        if (err) {
            return res.status(422).send({errors: [{title: 'File upload error', detail: err.message}]});
        }

        const id = res.locals.user.id;
        const photoPath = await handlePhotoChange(req, id);
        const { previousPhoto }: any = photoPath;

        if (previousPhoto && !previousPhoto.match(/twitter/)) { // do not delete test DB photos
            uploadImage(awsConfig).s3.deleteObject({
                Bucket: awsConfig.bucket,
                Key: previousPhoto,
            }, (error: Error, data: any): void => {
                if (error) {
                    const message = error.message;

                    console.warn(new Error(message));
                    next({ message, status: 500 });
                }
            });
        }

        const status = photoPath.newPhoto ? 'Photo was successfully uploaded' : 'Photo was successfully deleted';
        res.json({ status, photoPath: photoPath.newPhoto });
    });
};
