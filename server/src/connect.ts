import mongoose from 'mongoose';

mongoose.set('useNewUrlParserє', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

interface ITInput {
    DB_PATH: string;
}

export default ({DB_PATH}: ITInput): void => {

    const connect = async (): Promise<void> => {
        try {
            await mongoose
                .connect(
                    DB_PATH,
                    {useNewUrlParser: true},
                );
            console.info(`Successfully connected to ${DB_PATH}`);
        } catch (e) {
            console.error(e);
            return process.exit(1);
        }
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
