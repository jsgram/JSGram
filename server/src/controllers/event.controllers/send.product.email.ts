import { User, IUserModel } from '../../models/user.model';
import { sendEmail } from '../../helpers/send.email';

import pug from 'pug';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

export const sendProductEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { env: { HEROKU_ROOT, TEMPLATE_DIR, FRONT_PATH } }: any = process;
        const { compare, sender: { login, html_url } }: any = JSON.parse(req.body.payload);

        const templatePath = path.join(HEROKU_ROOT, TEMPLATE_DIR, 'subscription.product.pug');
        const renderTemplate = pug.compileFile(templatePath);

        const users = await User.find({ 'subscriptions.isNewsEmail': true });

        await Promise.all(users.map(async (user: IUserModel) => {
            const emailSubject = 'JSgram - Product Features';
            const emailBody = renderTemplate({
                user,
                baseUrl: FRONT_PATH,
                event: {
                    login,
                    html_url,
                    compare,
                },
            });

            // TODO error check

            return await sendEmail(user, emailSubject, emailBody);
        }));

        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};
