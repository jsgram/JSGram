export default (io: any): any => {
    const notifications = io.of('/notifications');
    notifications.on('connect', (socket: any): void => {

        socket.on('join room', (loggedId: string): void => {
            socket.join(`room-${loggedId}`);
        });

        socket.on('add new notification',
            ({userId, username, message}: {userId: string, username: string, message: string}): void => {
                socket.join(`room-${userId}`);
                notifications.in(`room-${userId}`).emit('add new notification', {username, message});
                socket.leave(`room-${userId}`);
            });
    });
};
