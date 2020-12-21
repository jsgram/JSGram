import { getProfilePosts } from '../getProfilePosts';
import { request, response } from 'express';
import mockingoose from 'mockingoose';
import * as profileRequests from '../../../db.requests/user.requests';
import * as postPagRequests from '../../../db.requests/get.posts.with.pagination';
import { User, IUserModel} from '../../../models/user.model';
import { Post, IPostModel } from '../../../models/post.model';

type IResolve<T> = (value: T) => void;

const fakeNext = jest.fn(() => { /* */});

describe('Get profile post controller:', () => {
    test('get profile post - success', async () => {
        mockingoose(User).toReturn({}, 'findOne');
        const fakeUserProfile: IUserModel = await User.findOne({}) as IUserModel;

        mockingoose(Post).toReturn({}, 'findOne');
        const fakePost: IPostModel[] = await Post.find({}) as IPostModel[];

        const mockGetProfile = jest.spyOn(profileRequests, 'getUserByUsername');
        const input = new Promise((res: IResolve<IUserModel>): void => res(fakeUserProfile));
        mockGetProfile.mockReturnValue(input);

        const mockGetPost = jest.spyOn(postPagRequests, 'getPostsWithPagination');
        const answer = new Promise((res: IResolve<IPostModel[]>): void => res(fakePost));
        mockGetPost.mockReturnValue(answer);

        request.params = {
            userName: 'some username',
            page: 1,
        };

        response.json = jest.fn(() => response);

        await getProfilePosts(request, response, fakeNext);
        expect(response.json).toHaveBeenCalledTimes(0);
    });
});
