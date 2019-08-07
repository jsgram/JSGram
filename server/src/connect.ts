import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

type TInput = {
    DB_PATH: string;
};

export default ({DB_PATH}: TInput) => {

    const connect = () => {
        mongoose
            .connect(
                DB_PATH,
                {useNewUrlParser: true},
            )
            .then(() => {
                return console.info(`Successfully connected to ${DB_PATH}`);
            })
            .catch((error) => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
