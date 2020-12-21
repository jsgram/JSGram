import io from 'socket.io-client';

export class SocketAPI {
    private socket: any;

    constructor(private path: string) {
        this.path = path;
        this.connect();
    }

    public connect(): Promise<unknown> {
        this.socket = io.connect(`${process.env.REACT_APP_BASE_API}/${this.path}`);
        return new Promise(((resolve: any, reject: any): void => {
            this.socket.on('connect', () => resolve());
            this.socket.on('connect error', (error: any) => reject(error));
        }));
    }

    public disconnect(): Promise<unknown> {
        return new Promise((resolve: any): void => {
            this.socket = null;
            resolve();
        });
    }

    public emit(event: any, data: any): Promise<unknown> {
        return new Promise(((resolve: any, reject: any): void => {
            if (!this.socket) {
                return reject('No socket connection');
            }

            return this.socket.emit(event, data);
        }));
    }

    public on(event: string, fun: (data: any) => void): Promise<unknown> {
        return new Promise((resolve: any, reject: any): void => {
            if (!this.socket) {
                return reject('No socket connection');
            }

            this.socket.on(event, fun);
            resolve();
        });
    }
}
