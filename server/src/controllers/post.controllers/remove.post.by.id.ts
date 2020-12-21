import { NextFunction, Request, Response } from 'express';
import { deletePost } from '../../db.requests/deletePost.request';
import { uploadImage } from '../../helpers/uploadImage';
import {
    bucket,
    acl,
    secretAccessKey,
    accessKeyId,
    region,
    fileSize,
} from '../../common.constants/aws.multer.post.constants';

const awsConfig = {
    bucket,
    acl,
    secretAccessKey,
    accessKeyId,
    region,
    fileSize,
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {locals: {user: {id: userId, isAdmin}}}: {locals: {user: {id: string, isAdmin: boolean}}} = res;
        const {params: {id: postId}, body: {authorId}}: {params: {id: string}, body: {authorId: string}} = req;
        const delPost = await deletePost(postId, userId, isAdmin, next);

        if (authorId !== userId && !isAdmin) {
            throw new Error(`Unauthorized attempt to delete post ${postId}.`);
        }

        if (delPost.imgPath.match(/amazonaws.com/)) { // do not delete test DB photos
            uploadImage(awsConfig).s3.deleteObject({
                Bucket: awsConfig.bucket,
                Key: delPost.imgPath.split('/').pop(),
            }, (error: Error, data: any): void => {
                if (error) {
                    throw new Error(error.message);
                }
            });
        }

        res.json({message: 'Post was successfully deleted', delPost});
    } catch (e) {
        next({message: 'Couldn\'t delete post', status: 500});
    }
};
