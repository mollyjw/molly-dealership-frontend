
export class User {
  id: number
  first_name: string
  last_name: string
  email: string
  nickname: string
  token: string
  constructor({
    id= 0,
    first_name = '',
    last_name = '',
    email = '',
    nickname = '',
    token = '',
    ...rest
  }) {
    Object.assign(this, rest)
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.nickname = nickname
    this.token = token
  }

}
