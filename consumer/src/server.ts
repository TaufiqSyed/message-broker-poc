import express, { Request, Response, NextFunction } from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app)
import { Server } from 'socket.io'
import { SocketIOService } from './utils/socket-io-service'
SocketIOService.instance().initialize(server)
import path from 'path'
import messageBrokerReceive from './utils/receive'

const port = '4000'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen(port)

// createUserHandler()
messageBrokerReceive()

/** Event listener for HTTP server "listening" event. */
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
})

async function delay(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

// To prevent re-renders when no update
app.get('/', function (req, res) {
  res.render('index')
})

app.get('/user', (req, res) => {
  res.render('user')
})
