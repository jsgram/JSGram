import { Request, Response, NextFunction } from 'express';
import { findUser, findUsers } from '../../db.requests/getFriendsRecommendations.requests';
import { createGraph, findRecommendations, sortFriendsRecommendations } from '../../helpers/getFriendsRecommendations';
import { serverError } from '../../common.constants/errors.constants';
import { IUserModel } from '../../models/user.model';

export const getFriendsRecommendations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await findUser(res.locals.user._id, next);
        if (!user) {
            const message = 'User is not found';

            console.warn(new Error(message));
            next({ message, status: 404 });
        }

        const usersGraph = createGraph(user as IUserModel);

        const listOfRecommendations = findRecommendations(usersGraph, (user as IUserModel)._id);

        const sortedListOfRecommendations = sortFriendsRecommendations(listOfRecommendations);

        const friendsRecommendations = await findUsers(sortedListOfRecommendations);

        res.json({friendsRecommendations});
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
