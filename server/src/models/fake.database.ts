import { User, IUserModel } from './user.model';
import { Token, ITokenModel } from './token.model';
import { Post, IPostModel } from './post.model';
import { Like, ILikeModel } from './like.model';

import '../helpers/globals';
import connect from '../connect';
import { hashPassword } from '../helpers/hash.password';

import mongoose from 'mongoose';
import faker from 'faker/locale/en';

faker.seed(983465);
mongoose.set('useNewUrlParser', true);

const { env: { DB_PATH } }: any = process;
const FAKE_DB_SIZE = parseInt(process.env.FAKE_DB_SIZE, 10);

const clearDatabase = async function(path: string): Promise<void> {
    await mongoose.createConnection(path).dropDatabase();
};

const generateUsers = async function(size: number): Promise<IUserModel[]> {
    const {
        internet: { email, userName, password },
        name: { firstName, lastName },
        helpers: { shuffle },
        random: { number: randomNumber },
    }: any = faker;

    const users = new Array(size).fill(null).map((throwaway: null) => ({
        email: email(),
        fullName: [firstName(), lastName()].join(' '),
        username: userName(),
        password: hashPassword(password(8)),
        isVerified: true,
    }));

    const createdUsers = await User.insertMany(users);

    createdUsers.forEach(async (user: IUserModel) => {
        const otherUsers = createdUsers.filter((u: IUserModel) => u !== user);
        shuffle(otherUsers);

        const followers = otherUsers.slice(randomNumber(size));
        user.followers = followers;

        followers.forEach(async (follower: IUserModel) => follower.following.push(user));
    });

    createdUsers.forEach(async (user: IUserModel) => await user.save());

    return createdUsers;
};

const generateTokens = async function(users: IUserModel[], size: number): Promise<ITokenModel[]> {
    const { random: { arrayElement, alphaNumeric } }: any = faker;

    const tokens = new Array(size).fill(null).map((throwaway: null) => ({
        user: arrayElement(users),
        token: alphaNumeric(32),
    }));

    return await Token.insertMany(tokens);
};

const generatePosts = async function(users: IUserModel[], size: number): Promise<IPostModel[]> {
    const {
        random: { arrayElement, alphaNumeric, number },
        lorem: { words },
    }: any = faker;

    const posts = new Array(size).fill(null).map((throwaway: null) => ({
        user: arrayElement(users),
        description: words(number(12)),
        imgPath: alphaNumeric(32) + '.jpg',
        tags: words(number(6)).split(' '),
    }));

    return await Post.insertMany(posts);
};

const generateLikes = async function(users: IUserModel[], posts: IPostModel[], size: number): Promise<ILikeModel[]> {
    const { random: { arrayElement } }: any = faker;

    const likes = new Array(size).fill(null).map((throwaway: null) => ({
        userId: arrayElement(users),
        postId: arrayElement(posts),
    }));

    return await Like.insertMany(likes);
};

const fakeDatabase = async function(): Promise<void> {
    await clearDatabase(DB_PATH);
    await connect(DB_PATH);

    const users = await generateUsers(FAKE_DB_SIZE);
    const tokens = await generateTokens(users, Math.ceil(FAKE_DB_SIZE / 2));
    const posts = await generatePosts(users, FAKE_DB_SIZE ** 2);
    const likes = await generateLikes(users, posts, FAKE_DB_SIZE ** 3);

    process.exit(1);
};

fakeDatabase();
