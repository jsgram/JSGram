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

const checkWhetherToRecommend = (queue: string[], friend: string, usersFriendshipDegree: IUsersFriendshipDegree,
                                 friendsRecommendations: IFriendsRecommendations, current: any): void => {
    // If this node is already in queue && distance to it !== distance to current node,
    // which in our case means that this user is common for at least two root user's friends
    if (queue.includes(friend) && usersFriendshipDegree[friend] !== usersFriendshipDegree[current]) {
        // If this user is already in recommendations, increase it's score by one,
        // else add it to recommendations and set score to 1
        if (friendsRecommendations[friend]) {
            friendsRecommendations[friend] += 1;
        } else {
            friendsRecommendations[friend] = 1;
        }
    }
};

const setDistanceAndPushToQueue = (queue: string[], friend: string,
                                   usersFriendshipDegree: IUsersFriendshipDegree, current: any): void => {
    // If we haven't visited this node, set distance to it by adding 1 to the current distance
    if (usersFriendshipDegree[friend] === Infinity) {
        usersFriendshipDegree[friend] = usersFriendshipDegree[current] + 1;
        // Push this node to the queue
        queue.push(friend);
    }
};

export const findRecommendations = (users: IGraph, rootUser: string): IFriendsRecommendations => {
    // Object, where key - is node, value - distance from the root node
    // (in our case, distance 1 - they are friends, 2 - have mutual friend, and so on)
    const usersFriendshipDegree: IUsersFriendshipDegree = {};
    // Object, where key - user to be recommended, value - recommendation score
    const friendsRecommendations: IFriendsRecommendations = {};

    // Take all nodes of graph and set distance to rootUser to Infinity, which means, that node is not visited yet
    const allUsers = Object.keys(users);
    allUsers.forEach((user: string) => usersFriendshipDegree[user] = Infinity);
    // Set distance from root node to itself to 0
    usersFriendshipDegree[rootUser] = 0;
    // Keep track of nodes to visit
    const queue = [rootUser];
    // Keep track of node we are currently traversing
    let current: any;
    // Keep traversing until there is no node anymore to traverse
    while (queue.length !== 0) {
        // Take node from queue (at the beggining - rootUser)
        current = queue.shift();
        // Get all nodes connected to the current node
        const userFriends = users[current];
        // For each connected node
        userFriends.forEach((friend: string) => {
            checkWhetherToRecommend(queue, friend, usersFriendshipDegree, friendsRecommendations, current);
            setDistanceAndPushToQueue(queue, friend, usersFriendshipDegree, current);
        });
    }

    return friendsRecommendations;
};

export const sortFriendsRecommendations = (friendsRecommendations: IFriendsRecommendations): string[] => {

    return Object.keys(friendsRecommendations)
           .sort((a: string, b: string) => friendsRecommendations[b] - friendsRecommendations[a]);
};
