import amqp from 'amqplib/callback_api'
import { UserAttributes } from '../types'

const messageBrokerSend: (arg0: any) => any = (user: UserAttributes) => {
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) throw error0

    connection.createChannel(function (error1, channel) {
      if (error1) throw error1

      var queue = 'create_user'
      var msg = JSON.stringify(user)

      channel.assertQueue(queue, {
        durable: false,
      })

      channel.sendToQueue(queue, Buffer.from(msg))
      console.log(' [x] Sent %s', msg)
    })
    setTimeout(function () {
      connection.close()
      // process.exit(0)
    }, 500)
  })
}
export default messageBrokerSend
