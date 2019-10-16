import { Interaction, IInteractionModel } from '../../models/interaction.model';
import { serverError } from '../../common.constants/errors.constants';

import { Request, Response, NextFunction } from 'express';

export const createInteraction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { locals: { user } }: Response = res;
        const {
            body: { clientEnd, clientStart, interactions, conversions, language, page, platform, loadTime, unloadTime },
            ip,
        }: Request = req;

        await Interaction.create({
            userId: user,
            ipAddress: ip,
            clientEnd,
            clientStart,
            interactions,
            conversions,
            language,
            page,
            platform,
            loadTime,
            unloadTime,
        });

        res.sendStatus(201);
    } catch (e) {
        console.error(e);
        next(serverError);
    }
};
