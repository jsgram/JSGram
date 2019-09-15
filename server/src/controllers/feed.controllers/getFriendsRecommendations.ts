import { Request, Response, NextFunction } from 'express';
import { findUser, findUsers } from '../../db.requests/getFriendsRecommendations.requests';
import { createGraph, findRecommendations, sortFriendsRecommendations } from '../../helpers/getFriendsRecommendations';

export const getFriendsRecommendations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await findUser(res.locals.user._id, next);
        if (!user) {
            throw new Error('User is not found');
        }

        const usersGraph = createGraph(user);

        const listOfRecommendations = findRecommendations(usersGraph, user._id);

        const sortedListOfRecommendations = sortFriendsRecommendations(listOfRecommendations);

        const friendsRecommendations = await findUsers(sortedListOfRecommendations);

        res.json({friendsRecommendations});
    } catch (e) {
        next({message: e.message, status: 409});
    }
};
