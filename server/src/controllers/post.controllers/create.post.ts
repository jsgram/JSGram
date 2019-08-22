import { Request, Response, NextFunction } from 'express';
import { Post } from '../../models/post.model';
import { uploadImage } from '../../helpers/uploadImage';
import { IPostModel } from '../../models/post.model';

const awsConfig = {
    bucket: 'jsgram-post-images1',
    acl: 'public-read',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_2,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_2,
    region: process.env.AWS_REGION_2,
    fileSize: 1024 * 1024 * 4,
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

            const newPost = new Post({
                description,
                imgPath,
                tags,
                author: author.id,
            });

            newPost.save((error: Error, post: IPostModel) => {
                if (error) {
                    throw new Error('Can not create new post');
                }
                author.posts.push(post.id);
                author.save();
            });

            res.json({newPost});
        } catch (e) {
            next({message: 'Can not create new post', status: 500});
        }
    });
};
