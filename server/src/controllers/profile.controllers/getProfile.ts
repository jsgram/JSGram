import { Request, Response, NextFunction } from 'express';
import { getUserByUsername } from '../../db.requests/user.requests';
import { Interaction, IInteractionModel } from '../../models/interaction.model';
import { serverError } from '../../common.constants/errors.constants';

interface IParams {
    page: number;
    userName: string;
}

interface ISession {
    timestamp: number;
    sessionLength: number;
}

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName }: IParams = req.params;
        const user = await getUserByUsername(userName, next);

        const {
            _id,
            posts,
            followers,
            following,
            bio,
            fullName,
            username,
            photoPath,
            subscriptions,
            privacy,
            email,
            createdAt,
            isAdmin,
        }: any = user;

        const interactions = await Interaction.find({ userId: _id }).sort({ unloadTime: -1 });
        const { ipAddress, language, platform }: IInteractionModel = interactions[0];

        const sessions = interactions.map((x: IInteractionModel): ISession => ({
            timestamp: x.unloadTime.getTime(),
            sessionLength: x.unloadTime.getTime() - x.loadTime.getTime(),
        }));

        const lastSession = sessions[0].sessionLength;
        const dailySession = sessions
            .filter((x: ISession): boolean => x.timestamp > new Date().getTime() - 86400000)
            .reduce((a: number, b: ISession): number => a + b.sessionLength, 0);
        const totalSession = sessions.reduce((a: number, b: ISession): number => a + b.sessionLength, 0);

        const userProfile = {
            _id,
            posts: posts.length,
            followers,
            following,
            description: bio,
            fullName,
            username,
            photo: photoPath,
            subscriptions,
            privacy,
            email,
            createdAt,
            isAdmin,
            ipAddress,
            language,
            platform,
            lastSession,
            dailySession,
            totalSession,
        };

        res.json({userProfile});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
