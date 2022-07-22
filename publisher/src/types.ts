export type UserCreationAttributes = {
  email: string
  phone: string
  age: number
}

export type UserAttributes = {
  id?: string
  email: string
  phone: string
  age: number
}

export type OutboxCreationAttributes = {
  message: string
}

export type OutboxAttributes = {
  id?: string
  message: string
}
