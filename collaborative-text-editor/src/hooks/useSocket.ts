/** A simple hook for the client socket initialization */

import { useRef, useEffect } from "react";
import io , { ManagerOptions, SocketOptions, Socket } from "socket.io-client";

export const useSocket = (
    uri: string, opts?: Partial<ManagerOptions & SocketOptions> | undefined
): Socket =>{
    const { current: socket } = useRef(io(uri, opts));
    useEffect(() =>{
        if (socket) socket.close(); // If we have an open socket close it first
    }, [socket])
    return socket

}
