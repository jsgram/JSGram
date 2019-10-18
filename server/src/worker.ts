import { User, IUserModel } from './models/user.model';
import { Post } from './models/post.model';
import { sendEmail } from './helpers/send.email';
import { renderTemplate } from './helpers/render.template';

import EventEmitter from 'events';

interface IObservable {
    handler: any;
    user: IUserModel;
}

const { env: { NOTIFICATION_TIMEOUT } }: any = process;

const notificationPool: IObservable[] = [];
export const notificationEmitter = new EventEmitter();

export const notificationWorker = async (user: IUserModel): Promise<void> => {
    try {
        const postRecommendations = await Post.find({ author: { $ne: user._id } }).limit(9);
        const userRecommendations = await User.find({ _id: { $ne: user._id } }).limit(6);

        const emailSubject = `${user.username}, see new posts from
            ${userRecommendations[0].username},
            ${userRecommendations[2].username},
            ${userRecommendations[4].username} and more`;
        const emailBody = renderTemplate('subscription.reminder.pug', {
            user,
            posts: postRecommendations,
            users: userRecommendations,
        });

        const isMailSend = await sendEmail(user, emailSubject, emailBody);

        if (!isMailSend) {
            throw new Error(`Error sending reminder email to ${user._id}.`);
        }
    } catch (e) {
        console.error(e);
    }
};

export const enqueueNotification = (user: IUserModel): void => {
    const regularTimeout = +NOTIFICATION_TIMEOUT * 1000;
    const initialTimeout: number = (
        (Date.now() - user.createdAt.getTime()) % regularTimeout
    );

    const watcher = {
        user,
        handler: setTimeout((throwaway: IUserModel) => {
            notificationWorker(user); // no awaiting
            clearTimeout(watcher.handler);
            watcher.handler = setInterval((throwaway2: IUserModel) => notificationWorker(user), regularTimeout);
        }, initialTimeout),
    };

    notificationPool.push(watcher);
};

export const dequeueNotification = (userId: string): void => {
    const index = notificationPool.findIndex((item: IObservable) => item.user._id === userId);
    const [watcher]: any = notificationPool.splice(index, 1);
    if (watcher) {
        clearInterval(watcher.handler);
    }
};

export const notificationStarter = async (): Promise<void> => {
    const users = await User.find({ 'subscriptions.isReminderEmail': true });
    users.forEach((user: IUserModel) => enqueueNotification(user));
};

notificationEmitter.on('enqueue', enqueueNotification);
notificationEmitter.on('dequeue', dequeueNotification);
