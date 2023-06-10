import socketio from "socket.io-client";
import { createContext } from "react";
export const StudentContext = createContext();

const uri = process.env.REACT_APP_API_BASE_URL;

export const socket = socketio.connect(uri);
export const SocketContext = createContext();
