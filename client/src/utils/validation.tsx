interface IUser {
    username?: string;
    email?: string;
    fullName?: string;
    password?: string;
}

interface IPasswordChange {
    oldPassword?: string;
    newPassword?: string;
    newPasswordConfirm?: string;
    [index: string]: any;
}

const validate = (user: IUser): IUser => {
    const errors: IUser = {};
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!user.username || user.username.length < 3) {
        errors.username = 'Please, enter your username!';
    }
    if (!user.email) {
        errors.email = 'Please, enter your email!';
    } else if (!validEmail.test(user.email)) {
        errors.email = 'Invalid email address';
    }
    if (!user.fullName || user.fullName.length < 3) {
        errors.fullName = 'Please, enter your fullname!';
    }
    if (!user.password || user.password.length < 8) {
        errors.password = 'Please, enter your password!';
    }
    return errors;
};

export const validatePasswordChange = (data: IPasswordChange): IPasswordChange => {
    const errors: IPasswordChange = {};

    if (data.oldPassword === data.newPassword) {
        errors.oldPassword = errors.newPassword = 'New password equals to the old one.';
    }

    if (data.newPassword !== data.confirmPassword) {
        errors.newPassword = errors.confirmPassword = 'New password and its confirmation do not match.';
    }

    for (const field in data) {
        if (data[field].length < 8) {
            errors[field] = 'Password must be at least 8 characters long.';
        }
    }

    return errors;
};

export const isValidSettings = (data: any): any => (
    Object.values(data).every((value: any): any => typeof value === 'boolean')
);

export default validate;
