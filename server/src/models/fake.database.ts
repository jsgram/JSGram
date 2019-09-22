import { User, IUserModel } from './user.model';
import { Token, ITokenModel } from './token.model';
import { Post, IPostModel } from './post.model';
import { Comment, ICommentModel } from './comment.model';
import { Like, ILikeModel } from './like.model';

import '../helpers/globals';
import connect from '../connect';
import { hashPassword } from '../helpers/hash.password';

import mongoose, { Schema, Document, Model, model } from 'mongoose';
import faker from 'faker/locale/en';
import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';

faker.seed(983465);
mongoose.set('useNewUrlParser', true);

const { env: { DB_PATH, IMAGE_DB_PATH, IMGUR_CLIENT_ID } }: any = process;
const FAKE_DB_SIZE = parseInt(process.env.FAKE_DB_SIZE, 10);

const capitalizeSentence = (sentence: string): string => {
    if (!sentence) {
        return sentence;
    }

    return sentence[0].toUpperCase() + sentence.slice(1) + '.';
};

const clearDatabase = async (path: string): Promise<void> => {
    await mongoose.createConnection(path).dropDatabase();
};

const generateUsers = async (size: number): Promise<IUserModel[]> => {
    const {
        internet: { email, userName, password, avatar },
        name: { firstName, lastName },
        helpers: { shuffle },
        random: { number: randomNumber },
    }: any = faker;

    interface ICredentials {
        email: string;
        password: string;
    }

    const credentials: ICredentials[] = new Array(size).fill(null).map((throwaway: null) => ({
        email: email(),
        password: password(8),
    }));

    console.log('\nLogin credentials:'); // tslint:disable-line no-console
    console.table(credentials);

    const users = credentials.map((x: ICredentials) => ({
        fullName: [firstName(), lastName()].join(' '),
        email: x.email,
        username: userName(),
        password: hashPassword(x.password),
        isVerified: true,
        photoPath: avatar(),
    }));

    const createdUsers = await User.insertMany(users);

    createdUsers.forEach((user: IUserModel) => {
        const otherUsers = createdUsers.filter((u: IUserModel) => u !== user);
        shuffle(otherUsers);

        const followers = otherUsers.slice(randomNumber(size));
        user.followers = followers;

        followers.forEach((follower: IUserModel) => follower.following.push(user));
    });

    await Promise.all(
        createdUsers.map(async (user: IUserModel) => await user.save()),
    );

    return createdUsers;
};

const generateTokens = async (users: IUserModel[], size: number): Promise<ITokenModel[]> => {
    const { random: { arrayElement, alphaNumeric } }: any = faker;

    const tokens = new Array(size).fill(null).map((throwaway: null) => ({
        user: arrayElement(users),
        token: alphaNumeric(32),
    }));

    return await Token.insertMany(tokens);
};

const generateImages = async (size: number): Promise<string[]> => {
    /*
     * Imgur image names are generated randomly and cannot be set.
     * Hash table eliminates image redunduncy while running DB seed multiple times.
     *
     */
    const imageDB = await mongoose.createConnection(IMAGE_DB_PATH);

    interface IImageModel extends Document {
        imageHash: string;
    }

    const ImageSchema = new Schema({
        imageHash: { type: String },
    });

    const Image: Model<IImageModel> = imageDB.model<IImageModel>('Image', ImageSchema);

    const imageTable = await Image.find({});

    const imgurOptions = {
        headers: { Authorization: `Client-ID ${IMGUR_CLIENT_ID}` },
    };

    for (let i = 0; i < size; i++) {
        if (imageTable[i] === undefined) {
            imageTable[i] = await Image.create({});
        }

        const { imageHash }: IImageModel = imageTable[i];

        try {
            try {
                process.stdout.write(`\rChecking image ${i + 1} from ${size}.`);

                if (imageHash) {
                    await axios.get(`https://api.imgur.com/3/image/${imageHash}`, imgurOptions);
                } else {
                    throw new Error();
                }
            } catch (e) {
                process.stdout.write(`\rUploading image ${i} from ${size}.`);
                const { data: mockImage }: AxiosResponse = await axios.get(`https://picsum.photos/id/${i}/1280/1024`, {
                    responseType: 'arraybuffer',
                });

                const data = new FormData();
                data.append('image', mockImage);

                const { _boundary: boundary }: any = data; // unable to access _boundary without destructuring
                const { data: { data: { id: newImageHash } } }: AxiosResponse = await axios.post(
                    `https://api.imgur.com/3/upload`,
                    data,
                    {
                        headers: {
                            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
                            'Content-Type': `multipart/form-data; boundary=${boundary}`,
                        },
                    },
                );

                imageTable[i].imageHash = newImageHash;
                await imageTable[i].save();
            }
        } catch (e) {
            console.log(` - ${e}`); // tslint:disable-line:no-console
        }
    }

    imageDB.close();
    return imageTable.map((x: IImageModel): string => x.imageHash);
};

const generatePosts = async (users: IUserModel[], size: number): Promise<IPostModel[]> => {
    const {
        random: { arrayElement, number },
        lorem: { words },
        date: { past },
    }: any = faker;

    const images = await generateImages(size);

    const posts = new Array(size).fill(null).map((throwaway: null, i: number) => ({
        author: arrayElement(users),
        description: capitalizeSentence(words(number(24))),
        imgPath: `https://i.imgur.com/${images[i]}.jpg`, /* Imgur doesn't care about extension type but its presence. */
        tags: words(number(6)).split(' '),
        createdAt: past(),
    }));

    const createdPosts = await Post.insertMany(posts);

    await Promise.all(users.map(async (user: IUserModel) => {
        user.posts = await Post.find({ author: user._id });
        await user.save();
    }));

    return createdPosts;
};

const generateComments = async (users: IUserModel[], posts: IPostModel[], size: number): Promise<ICommentModel[]> => {
    const {
        random: { arrayElement, alphaNumeric, number },
        lorem: { words },
        date: { past },
    }: any = faker;

    const comments = new Array(size).fill(null).map((throwaway: null) => ({
        postId: arrayElement(posts),
        authorId: arrayElement(users),
        comment: capitalizeSentence(words(1 + number(11))),
        createdAt: past(),
    }));

    const createdComments = await Comment.insertMany(comments);

    await Promise.all(posts.map(async (post: IPostModel) => {
        post.comments = await Comment.find({ postId: post._id });
        await post.save();
    }));

    return createdComments;
};

const generateLikes = async (users: IUserModel[], posts: IPostModel[], size: number): Promise<ILikeModel[]> => {
    const { random: { arrayElement } }: any = faker;

    const likes = new Array(size).fill(null).map((throwaway: null) => ({
        userId: arrayElement(users),
        postId: arrayElement(posts),
    }));

    const createdLikes = await Like.insertMany(likes);

    await Promise.all(posts.map(async (post: IPostModel) => {
        const postLikes = await Like.find({ postId: post._id });
        post.authorsOfLike = postLikes.map((x: ILikeModel) => x.userId);
        await post.save();
    }));

    return createdLikes;
};

const fakeDatabase = async (): Promise<void> => {
    await clearDatabase(DB_PATH);
    await connect(DB_PATH);

    const users = await generateUsers(FAKE_DB_SIZE);
    const tokens = await generateTokens(users, Math.ceil(FAKE_DB_SIZE / 2));
    const posts = await generatePosts(users, FAKE_DB_SIZE ** 2);
    const comments = await generateComments(users, posts, FAKE_DB_SIZE ** 3);
    const likes = await generateLikes(users, posts, FAKE_DB_SIZE ** 3);

    process.exit(0);
};

fakeDatabase();
