import amqp from 'amqplib/callback_api'
import { UserAttributes } from '../types'
import { SocketIOService } from './socket-io-service'

const messageBrokerReceive = () => {
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }

      var queue = 'create_user'

      channel.assertQueue(queue, {
        durable: false,
      })

      console.log(
        ' [*] Waiting for messages in %s. To exit press CTRL+C',
        queue
      )

      channel.consume(
        queue,
        function (msg) {
          const decoded = JSON.parse(msg!.content.toString())
          const user: UserAttributes = {
            id: decoded.id,
            email: decoded.email,
            phone: decoded.phone,
            age: decoded.age,
          }
          console.log(' [x] Received %s', msg!.content.toString())
          // console.log(msg!.content.toString())
          console.log(user)
          SocketIOService.instance().emitUserCreated(user)
        },
        {
          noAck: true,
        }
      )
    })
  })
}

export default messageBrokerReceive
