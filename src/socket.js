import React from "react";
import io from "socket.io-client";

const host = process.env.REACT_APP_SOCKET_HOST;

export const socket = io(host);

const SocketContext = React.createContext(socket);

export default SocketContext;