import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

type TInput = {
    db_path: string;
}

export default ({db_path}: TInput) => {

    const connect = () => {
        mongoose
            .connect(
                db_path,
                {useNewUrlParser: true}
            )
            .then(() => {
                return console.info(`Successfully connected to ${db_path}`);
            })
            .catch(error => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            })
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
