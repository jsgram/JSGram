import { Request, Response, NextFunction } from 'express';
import { updateComment } from '../../db.requests/update.comment.request';
import { decodeJWT } from '../../helpers/jwt.encoders';

interface IParams {
    params: {
        id: string;
    };
}

interface IReqBody {
    body: {
        comment: string;
        email: string;
    };
}

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params: { id } }: IParams = req;
        const { body: { comment, email } }: IReqBody = req;
        const decodedTokenEmail = res.locals.user.email;

        if (decodedTokenEmail !== email) {
            throw new Error('You don\'t have permission to change comment');
        }

        const updatedComment = await updateComment(id, comment, next);

        if (!updatedComment) {
            throw new Error('Comment doesn\'t exist');
        }

        res.json({message: 'Comment was successfully updated', updatedComment});
    } catch (e) {
        next({message: 'Can not update comment', status: 500});
    }
};
