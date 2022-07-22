import socketio from 'socket.io'
import { Server } from 'http'

export const getIo = (server: Server) => new socketio.Server(server)
