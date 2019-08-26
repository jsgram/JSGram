import {app} from './app';
import connect from './connect';

app.listen(process.env.PORT, () => console.info('Listening...'));
connect(process.env.DB_PATH);
