import { app } from './app';
import connect from './connect';
import { notificationLoop } from './worker';

app.listen(process.env.PORT, () => console.info('Listening...'));
(async (): Promise<void> => {
    await connect(process.env.DB_PATH);
    await notificationLoop();
})();
