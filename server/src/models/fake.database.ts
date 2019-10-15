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

faker.seed(643246);
mongoose.set('useNewUrlParser', true);

const { env: { DB_PATH, IMAGE_DB_PATH, IMGUR_CLIENT_ID } }: any = process;
const FAKE_DB_SIZE = process.argv[2] === '--big'
    ? 512 // fixed size for big database
    : parseInt(process.env.FAKE_DB_SIZE, 10);

const capitalizeSentence = (sentence: string): string => {
    if (!sentence) {
        return sentence;
    }

    return sentence[0].toUpperCase() + sentence.slice(1) + '.';
};

const clearDatabase = async (path: string): Promise<void> => {
    await mongoose.createConnection(path).dropDatabase();
};

const generateUsers = async (size: number): Promise<any[]> => {
    const {
        internet: { email, userName, password, avatar },
        name: { firstName, lastName },
        helpers: { shuffle },
        lorem: { words },
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
        _id: mongoose.Types.ObjectId(),
        fullName: [firstName(), lastName()].join(' '),
        email: x.email,
        username: userName(),
        password: hashPassword(x.password),
        isVerified: true,
        photoPath: avatar(),
        bio: capitalizeSentence(words(randomNumber(12))),
        followers: [],
        following: [],
    }));

    users.forEach((user: any) => {
        const otherUsers = users.filter((u: any) => u !== user);
        shuffle(otherUsers);

        const followers = otherUsers.slice(randomNumber(size));
        user.followers = followers;

        followers.forEach((follower: any) => follower.following.push(user));
    });

    return users;
};

const generateTokens = async (users: any[], size: number): Promise<any[]> => {
    const { random: { arrayElement, alphaNumeric } }: any = faker;

    const tokens = new Array(size).fill(null).map((throwaway: null) => ({
        user: arrayElement(users)._id,
        token: alphaNumeric(32),
    }));

    return await Token.insertMany(tokens);
};

const generateImages = async (size: number): Promise<string[]> => {
    /*
     * Imgur image names are generated randomly and cannot be set.
     * Hash table eliminates image redunduncy while running DB seed multiple times.
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

    if (process.argv[2] === '--big') {
        imageDB.close();
        return Array(size).fill(null).map((throwaway: null, i: number): string => imageTable[i % 255].imageHash);
    }

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
                const { data: mockImage }: AxiosResponse = await axios.get(`https://picsum.photos/id/${i}/1280/1280`, {
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

const generatePosts = async (users: any[], size: number): Promise<any[]> => {
    const {
        random: { arrayElement, number },
        lorem: { words },
        date: { past },
    }: any = faker;

    const images = await generateImages(size);

    const posts = new Array(size).fill(null).map((throwaway: null, i: number) => ({
        _id: mongoose.Types.ObjectId(),
        author: arrayElement(users)._id,
        description: capitalizeSentence(words(number(24))),
        imgPath: `https://i.imgur.com/${images[i]}.jpg`, /* Imgur doesn't care about extension type but its presence. */
        tags: words(number(6)).split(' '),
        createdAt: past(),
    }));

    users.forEach((user: IUserModel) => {
        user.posts = posts
            .filter((post: any): boolean => post.author === user._id)
            .map((post: any): string => post._id);
    });

    return posts;
};

const generateComments = async (users: any[], posts: any[], size: number): Promise<any[]> => {
    const {
        random: { arrayElement, alphaNumeric, number },
        lorem: { words },
        date: { past },
    }: any = faker;

    const comments = new Array(size).fill(null).map((throwaway: null) => ({
        _id: mongoose.Types.ObjectId(),
        postId: arrayElement(posts)._id,
        authorId: arrayElement(users)._id,
        comment: capitalizeSentence(words(1 + number(11))),
        createdAt: past(),
    }));

    posts.forEach((post: IPostModel) => {
        post.comments = comments
            .filter((comment: any): boolean => comment.postId === post._id)
            .map((comment: any): string => comment._id);
    });

    return comments;
};

const generateLikes = async (users: any[], posts: any[], size: number): Promise<any[]> => {
    const { random: { arrayElement } }: any = faker;

    const likes = new Array(size).fill(null).map((throwaway: null) => ({
        _id: mongoose.Types.ObjectId(),
        userId: arrayElement(users)._id,
        postId: arrayElement(posts)._id,
    }));

    posts.forEach((post: IPostModel) => {
        post.authorsOfLike = likes
            .filter((like: any): boolean => like.postId === post._id)
            .map((like: any): string => like.userId);
    });

    return likes;
};

const fakeDatabase = async (): Promise<void> => {
    await clearDatabase(DB_PATH);
    await connect(DB_PATH);

    const t = Date.now() / 1000;

    // Big database generation runs in some 5..10 minutes;
    // console.log gives a visual estimate of remaining time

    // tslint:disable no-console
    const users = await generateUsers(FAKE_DB_SIZE);
    console.log('users generated in', Date.now() / 1000 - t);
    const tokens = await generateTokens(users, Math.ceil(FAKE_DB_SIZE / 2));
    console.log('tokens done in', Date.now() / 1000 - t);
    const posts = await generatePosts(users, ~~(FAKE_DB_SIZE ** 1.5)); // tslint:disable-line no-bitwise
    console.log('posts generated in', Date.now() / 1000 - t);
    const comments = await generateComments(users, posts, FAKE_DB_SIZE ** 2);
    console.log('comments generated in', Date.now() / 1000 - t);
    const likes = await generateLikes(users, posts, FAKE_DB_SIZE ** 2);
    console.log('likes generated in', Date.now() / 1000 - t);

    await User.insertMany(users);
    console.log('users inserted in', Date.now() / 1000 - t);
    await Post.insertMany(posts);
    console.log('posts inserted in', Date.now() / 1000 - t);
    await Comment.insertMany(comments);
    console.log('comments inserted in', Date.now() / 1000 - t);
    await Like.insertMany(likes);
    console.log('likes inserted in', Date.now() / 1000 - t);
    // tslint:enable no-console

    process.exit(0);
};

fakeDatabase();
