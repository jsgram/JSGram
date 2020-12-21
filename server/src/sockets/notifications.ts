export class Notifications {
    private namespace: any;
    constructor(private name: string, public io: any) {
        this.namespace = io.of(`/${name}`);
        this.listenOnRoom();
    }
    private listenOnRoom(): void {
        this.namespace.on('connect', (socket: any) => {
            this.handleJoinRoom(socket);
            this.handleOnNewNotification(socket);
        });
    }

    private handleJoinRoom(socket: any): void {
        socket.on('join room', (loggedId: string): void => {
            socket.join(`room-${loggedId}`);
        });
    }

    private handleOnNewNotification(socket: any): void {
        socket.on('add new notification',
            ({userId, username, message}: {userId: string, username: string, message: string}): void => {
                socket.join(`room-${userId}`);
                this.handleEmitNewNotification(socket, userId, username, message);
                socket.leave(`room-${userId}`);
            });
    }
    private handleEmitNewNotification(socket: any, userId: string, username: string, message: string): void {
        socket.broadcast.in(`room-${userId}`).emit('add new notification', {username, message});
    }
}
