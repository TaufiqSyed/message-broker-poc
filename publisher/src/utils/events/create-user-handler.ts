import EventEmitter from 'events'
import { UserAttributes } from '../../types'
import messageBrokerSend from '../send'

var createUserHandler = new EventEmitter()

createUserHandler.on('create_user', (user: UserAttributes) => {
  messageBrokerSend(user)
})

export default createUserHandler
