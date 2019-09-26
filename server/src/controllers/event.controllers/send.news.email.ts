import { User, IUserModel } from '../../models/user.model';
import { sendEmailHelper } from '../../helpers/send.email.helper';

import { Request, Response, NextFunction } from 'express';
import pug from 'pug';
import path from 'path';

export const sendNewsEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const templatePath = path.join(__dirname, process.env.TEMPLATE_DIR, 'news.email.pug');
        console.log(req.body, templatePath); // tslint:disable-line no-console
        const renderTemplate = pug.compileFile(templatePath);

        const users = await User.find({ 'subscriptions.isNewsEmail': true });
        console.log(users); // tslint:disable-line no-console

        await Promise.all(users.map(async (user: IUserModel) => {
            const { body: { compare, sender: { login, html_url } } }: Request = req;
            const emailBody = renderTemplate({
                user,
                baseUrl: process.env.BACK_PATH,
                event: {
                    login,
                    html_url,
                    compare,
                },
            });

            return await sendEmailHelper(user, emailBody);
        }));

        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};
