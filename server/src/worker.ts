import { NOTIFICATION_TIMEOUT } from './common.constants/notification.worker.constants';
import { User, IUserModel } from './models/user.model';
import { Post } from './models/post.model';
import { sendEmailHelper } from './helpers/send.email.helper';

import TinyQueue from 'tinyqueue';
import pug from 'pug';

interface IQueue {
    timeout: number;
    user: IUserModel;
}

const notificationWorker = async (user: IUserModel): Promise<void> => {
    try {
        const postRecommendations = await Post.find({ author: { $ne: user._id } }).limit(9);
        const userRecommendations = await User.find({ _id: { $ne: user._id } }).limit(6);

        const emailBody = pug.renderFile(`${process.env.TEMPLATE_DIR}/reminder.email.pug`, {
            user,
            baseUrl: process.env.BACK_PATH,
            posts: postRecommendations,
            users: userRecommendations,
        });

        const isMailSend = await sendEmailHelper(user, emailBody);

        if (!isMailSend) {
            throw new Error(`Error sending reminder email to ${user._id}.`);
        }
    } catch (e) {
        console.error(e);
    }
};

export const fillQueue = async (queue: TinyQueue<IQueue>): Promise<void> => {
    const users = await User.find({ 'subscriptions.isReminderEmail': true });

    while (queue.length) {
        queue.pop();
    }

    users.forEach((user: IUserModel): void => {
        const timeout: number = (Date.now() - user.createdAt.getTime()) % NOTIFICATION_TIMEOUT;
        const item: IQueue = { timeout, user };
        queue.push(item);
    });

    if (!users.length) {
        queue.push({
            timeout: NOTIFICATION_TIMEOUT,
            user: new User({
                email: 'dummy@ema.il',
                fullName: 'dummyfullname',
                username: 'dummyusername',
                password: 'dummypassword',
            }),
        });
    }
};

export const notificationLoop = async (): Promise<void> => {
    const priorityQueue = new TinyQueue([], (a: IQueue, b: IQueue): number => a.timeout - b.timeout);
    await fillQueue(priorityQueue);

    while (true) {
        const shouldReload = await {};
        if (shouldReload) {
            await fillQueue(priorityQueue);
        }

        const item = priorityQueue.pop() as IQueue;
        const { timeout, user }: IQueue = item;

        await new Promise((res: any): any => setTimeout(res, timeout)); // TODO RxJS

        notificationWorker(user);
        priorityQueue.push({ timeout: NOTIFICATION_TIMEOUT, user });
    }
};
