import { Request, Response, NextFunction } from 'express';
import { tokenVerification } from '../../helpers/token.verification';
import { IUserModel } from '../../models/user.model';

interface IFakeUser {
    posts: string[];
    followers: string[];
    following: string[];
    description: string;
}

export const getProfile = async (req: Request, res: Response, next: NextFunction):
                                 Promise<IUserModel | null | void> => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            return res.redirect(`${process.env.FRONT_PATH}/login`);
        }
        // TO DO: delete fake user, instead use data from DB
        const fakeUser = {
            posts: ['post1', 'post2', 'post3'],
            followers: ['follower1', 'follower2', 'follower3'],
            following: ['subscriber1', 'subscriber2'],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
                          'Harum iusto nesciunt repudiandae vel! Accusamus aliquid animi consequatur,' +
                          'consequuntur cumque dolorem eum eveniet fugit iste labore magni,' +
                          'obcaecati perferendis rerum veniam!',
        };
        const { posts, followers, following, description }: IFakeUser = fakeUser;

        const user: any = await tokenVerification(token, res, next);
        if (!user) {
            throw new Error('User does not exist');
        }

        const userProfile = {
            posts: posts.length,
            followers: followers.length,
            following: following.length,
            description,
            fullName: user.fullName,
            username: user.username,
            photo: user.photoPath,
        };

        res.json({userProfile});
    } catch (e) {
        next(e);
    }
};
