import {IUserModel, User} from '../models/user.model';

export const checkUserByProp = (prop: string): any => {
    return User.findOne({prop});
};
