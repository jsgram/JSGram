import mongoose from 'mongoose';

mongoose.set('useNewUrlParserє', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

export default async (DB_PATH: string): Promise<void> => {

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
    await connect();

    mongoose.connection.on('disconnected', connect);
};
