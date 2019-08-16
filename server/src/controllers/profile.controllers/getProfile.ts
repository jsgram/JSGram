import { Request, Response, NextFunction } from 'express';
import { findById } from '../../db.requests/userProfile.requests';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    // TO DO: delete fake user, instead use data from DB
        const fakeUser = {
            posts: ['post1', 'post2', 'post3'],
            followers: ['follower1', 'follower2', 'follower3'],
            subscribers: ['subscriber1', 'subscriber2'],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
                          'Harum iusto nesciunt repudiandae vel! Accusamus aliquid animi consequatur,' +
                          'consequuntur cumque dolorem eum eveniet fugit iste labore magni,' +
                          'obcaecati perferendis rerum veniam!',
        };
        const { posts, followers, subscribers, description }: any = fakeUser;

        const user = await findById(req.params.id, next);

        const userProfile = {
            posts: posts.length,
            followers: followers.length,
            subscribers: subscribers.length,
            description,
            fullName: user.fullName,
            photo: user.photoPath,
        };

        res.json(userProfile);
    } catch (e) {
        next(e.message);
    }
};
