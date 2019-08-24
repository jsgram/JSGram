import {NextFunction, Request, Response} from 'express';
import validateInput, {IValidationError} from '../../helpers/validation';
import {sendChangingEmail} from '../../helpers/send.email';
import {changeEmailMessage} from '../../helpers/send.email.change.email';
import Validator from 'validator';

export const changeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { newEmail, profileUser: {email} }: {newEmail: string, profileUser: {email: string}} = req.body;
        if (Validator.isEmpty(newEmail)) {
            throw new Error('Email is empty');
        }

        await sendChangingEmail(newEmail, email, changeEmailMessage, next);

        res.json(
            {status: `A verification email has been sent to ${newEmail}`});
    } catch (e) {
        next({message: 'Can not change email', status: 500});
    }
};
