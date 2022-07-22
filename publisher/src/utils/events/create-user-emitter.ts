import { UserAttributes } from '../../types'
import createUserHandler from './create-user-handler'

export const emitCreateUserEvent = (user: UserAttributes) => {
  createUserHandler.emit('create_user', user)
}
