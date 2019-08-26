import { Request, Response, NextFunction } from 'express';

interface IFakeUser {
    posts: string[];
    followers: string[];
    following: string[];
}

export const getProfile = async (req: Request, res: Response, next: NextFunction):
    Promise<void> => {
    try {
        // TO DO: delete fake user, instead use data from DB
        const fakeUser = {
            posts: ['post1', 'post2', 'post3'],
            followers: ['follower1', 'follower2', 'follower3'],
            following: ['subscriber1', 'subscriber2'],
        };
        const { posts, followers, following }: IFakeUser = fakeUser;

        const user = res.locals.user;

        const userProfile = {
            posts: user.posts.length,
            followers: followers.length,
            following: following.length,
            description: user.bio,
            fullName: user.fullName,
            username: user.username,
            photo: user.photoPath,
            notifications: user.notifications,
            privacy: user.privacy,
            email: user.email,
        };

        res.json({userProfile});
    } catch (e) {
        next(e);
    }
};
