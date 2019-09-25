import { User, IUserModel } from '../../models/user.model';
import { sendEmailHelper } from '../../helpers/send.email.helper';

import { Request, Response, NextFunction } from 'express';
import pug from 'pug';

export const sendProductEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const renderTemplate = pug.compileFile(`${process.env.TEMPLATE_DIR}/product.email.pug`);
        const users = await User.find({ 'subscriptions.isProductEmail': true });

        await Promise.all(users.map(async (user: IUserModel) => {
            const { body: { repository: { stargazers_count }, sender: { login, html_url } } }: Request = req;
            const emailBody = renderTemplate({
                user,
                baseUrl: process.env.BACK_PATH,
                event: {
                    login,
                    html_url,
                    stargazers_count,
                    // login: 'cat',
                    // html_url: 'https://github.com',
                    // stargazers_count: 3,
                },
            });

            return await sendEmailHelper(user, emailBody);
        }));

        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};
