import { server } from './app';
import connect from './connect';
import { notificationStarter } from './worker';

server.listen(process.env.PORT, () => console.info('Listening...'));
(async (): Promise<void> => {
    await connect(process.env.DB_PATH);
    await notificationStarter();
})();
