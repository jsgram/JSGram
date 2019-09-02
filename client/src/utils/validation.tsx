interface IUser {
    username?: string;
    email?: string;
    fullName?: string;
    password?: string;
    description?: string;
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
        errors.username = 'Please, enter your username.';
    }
    if (!user.email) {
        errors.email = 'Please, enter your email.';
    } else if (!validEmail.test(user.email)) {
        errors.email = 'Invalid email address.';
    }
    if (!user.fullName || user.fullName.length < 3) {
        errors.fullName = 'Please, enter your fullname.';
    }
    if (!user.password || user.password.length < 8) {
        errors.password = 'Please, enter your password.';
    }
    if (!user.description || user.description.length < 3 || user.description.length > 200) {
        errors.description = 'Description should be more than 3 and less than 200.';
    }
    return errors;
};

export const validatePasswordChange = (data: IPasswordChange): IPasswordChange => {
    const errors: IPasswordChange = {};

    for (const field in data) {
        if (data[field].length < 8) {
            errors[field] = 'Password must be at least 8 characters long.';
        }
    }

    if (data.newPassword !== data.newPasswordConfirm) {
        errors.newPassword = errors.newPasswordConfirm = 'Entered passwords do not match.';
    }

    if (data.oldPassword === data.newPassword) {
        errors.oldPassword = errors.newPassword = 'New password equals to the old one.';
    }

    return errors;
};

export const isValidSettings = (data: any): boolean => (
    Object.values(data).every((value: any): boolean => typeof value === 'boolean')
);

export default validate;
