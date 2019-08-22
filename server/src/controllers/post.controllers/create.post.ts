import { Request, Response, NextFunction } from 'express';
import { uploadImage } from '../../helpers/uploadImage';
import { addPost } from '../../db.requests/addPost.request';
import { bucket,
         acl,
         secretAccessKey,
         accessKeyId,
         region,
         fileSize } from '../../common.constants/aws.multer.post.constants';

const awsConfig = {
    bucket,
    acl,
    secretAccessKey,
    accessKeyId,
    region,
    fileSize,
};

const singleUpload = uploadImage(awsConfig).multerInstance.single('postImage');

export const create = (req: Request, res: Response, next: NextFunction): void => {
    singleUpload(req, res, async (err: Error) => {
        if (err) {
            return res.status(422).send({errors: [{title: 'File upload error', detail: err.message}]});
        }
        try {
            const author = res.locals.user;
            const description = req.body.description;
            const imgPath = req.file.location;
            const hashtagRegex = /\B(\#[a-zA-Z0-9]+\b)/g;
            const tags = req.body.description.match(hashtagRegex);

            const newPost = await addPost(author, description, imgPath, tags);
            res.json({newPost});
        } catch (e) {
            next({message: 'Can not create new post', status: 500});
        }
    });
};
