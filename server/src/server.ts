import {app} from './app';
import connect from './connect';

app.listen(process.env.DEV_PORT, () => console.info('Listening...'));
connect(process.env.DB_PATH);
