import { User, IUserModel } from '../../models/user.model';
import { sendEmailHelper } from '../../helpers/send.email.helper';

import { Request, Response, NextFunction } from 'express';
import pug from 'pug';
import path from 'path';

export const sendProductEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const templatePath = path.join(process.env.HEROKU_ROOT, process.env.TEMPLATE_DIR, 'product.email.pug');
        console.log(templatePath); // tslint:disable-line no-console
        const renderTemplate = pug.compileFile(templatePath);
        console.log(renderTemplate); // tslint:disable-line no-console

        const users = await User.find({ 'subscriptions.isProductEmail': true });

        await Promise.all(users.map(async (user: IUserModel) => {
            console.log(user, req.body); // tslint:disable-line no-console
            const {
                body: { response: { repository: { stargazers_count }, sender: { login, html_url } } },
            }: Request = req;
            console.log(login, html_url, stargazers_count); // tslint:disable-line no-console
            const emailBody = renderTemplate({
                user,
                baseUrl: process.env.BACK_PATH,
                event: {
                    login,
                    html_url,
                    stargazers_count,
                },
            });

            return await sendEmailHelper(user, emailBody);
        }));

        console.log(805); // tslint:disable-line no-console
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};
