import { User, IUserModel } from '../../models/user.model';
import { sendEmailHelper } from '../../helpers/send.email.helper';

import { Request, Response, NextFunction } from 'express';
import pug from 'pug';
import path from 'path';

export const sendProductEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { env: { HEROKU_ROOT, TEMPLATE_DIR, FRONT_PATH } }: any = process;
        const {
            action, repository: { stargazers_count }, sender: { login, html_url },
        }: any = JSON.parse(req.body.payload);

        if (action === 'deleted') {
            return;
        }

        const templatePath = path.join(HEROKU_ROOT, TEMPLATE_DIR, 'product.email.pug');
        const renderTemplate = pug.compileFile(templatePath);

        const users = await User.find({ 'subscriptions.isProductEmail': true });

        await Promise.all(users.map(async (user: IUserModel) => {
            const emailBody = renderTemplate({
                user,
                baseUrl: FRONT_PATH,
                event: {
                    login,
                    html_url,
                    stargazers_count,
                },
            });

            return await sendEmailHelper(user, emailBody);
        }));

        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};
