import { Request, Response, NextFunction } from 'express';
import { findById } from '../../db.requests/userProfile.requests';
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

        const user = await findById(req.params.id, next);

        if (!user) {
            throw new Error('There is no user with this id.');
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

        res.json(userProfile);
    } catch (e) {
        next(e.message);
    }
};
