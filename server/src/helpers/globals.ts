import {config} from 'dotenv';

// Credit: https://stackoverflow.com/a/53981706
declare global {
    namespace NodeJS {
        interface ProcessEnv { // tslint:disable-line interface-name
            DB_PATH: string;
            PORT: string;
            FAKE_DB_SIZE: string;
            BACK_PASS: string;
            FRONT_PASS: string;
            STATIC_PATH: string;
            SECRET_KEY: string;
            EMAIL: string;
            EMAIL_PASS: string;
            IMGUR_CLIENT_ID: string;
            IMAGE_DB_PATH: string;
            TEMPLATE_DIR: string;
            HEROKU_ROOT: string;
        }
    }
}

config();
