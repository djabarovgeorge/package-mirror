import * as signalR from "@microsoft/signalr";


class SocketService 
{
        connection = null;

        async initSocket()
        {
        if (this.connection) {
                await this.connection.stop();
        }
        this.connection = new signalR.HubConnectionBuilder()
                .configureLogging(signalR.LogLevel.Trace)
                .withUrl('https://localhost:5001/hub/packages')
                .withAutomaticReconnect({
                        nextRetryDelayInMilliseconds: retryContext => {
                            if (retryContext.elapsedMilliseconds < 10000) {
                                // If we've been reconnecting for less than 60 seconds so far,
                                // wait between 0 and 5 seconds before the next reconnect attempt.
                                return Math.random() * 5000;
                            } else {
                                // If we've been reconnecting for more than 60 seconds so far, stop reconnecting.
                                return null;
                            }
                        }
                })
                .build();
}

async start() {
        await this.connection.start();
        return this.connection.connectionId;
}
}

export const socketService = new SocketService();