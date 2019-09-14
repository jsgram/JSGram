import { IUser } from '../db.requests/getFriendsRecommendations.requests';

interface IGraph {
    [id: string]: string[];
}

interface IUsersFriendshipDegree {
    [id: string]: number;
}

interface IFriendsRecommendations {
    [id: string]: number;
}

export const createGraph = (user: IUser): IGraph => {
    const graph: IGraph = {
        [user._id]: user.following.map((fol: any) => fol._id),
    };

    return user.following.reduce((result: IGraph, fol: any) => {
        const updatedByFollowingResult = fol.following.reduce((res: IGraph, follow: any) => {
            if (!res[follow]) {
                return {...res, [follow]: [] };
            }
            return res;
        }, result);

        return {...updatedByFollowingResult, [fol._id]: fol.following.map((f: object) => f.toString())};
    }, graph);
};

export const findRecommendations = (users: IGraph, root: string): IFriendsRecommendations => {
    const usersFriendshipDegree: IUsersFriendshipDegree = {};
    const friendsRecommendations: IFriendsRecommendations = {};

    const allUsers = Object.keys(users);
    allUsers.forEach((user: string) => usersFriendshipDegree[user] = Infinity);

    usersFriendshipDegree[root] = 0;

    const queue = [root];
    let current: any;
    while (queue.length !== 0) {
        current = queue.shift();

        const userFriends = users[current];
        userFriends.forEach((friend: string) => {
            if (queue.includes(friend) && usersFriendshipDegree[friend] !== usersFriendshipDegree[current]) {
                if (friendsRecommendations[friend]) {
                    friendsRecommendations[friend] += 1;
                } else {
                    friendsRecommendations[friend] = 1;
                }
            }

            if (usersFriendshipDegree[friend] === Infinity) {
                usersFriendshipDegree[friend] = usersFriendshipDegree[current] + 1;
                queue.push(friend);
            }
        });
    }

    return friendsRecommendations;
};

export const sortFriendsRecommendations = (friendsRecommendations: IFriendsRecommendations): string[] => {

    return Object.keys(friendsRecommendations)
           .sort((a: string, b: string) => friendsRecommendations[b] - friendsRecommendations[a]);
};
