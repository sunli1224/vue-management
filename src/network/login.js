import { request } from './request'

export function checkLoginInfo (username, password) {
  return request({
    method: 'POST',
    url: '/auth-user-provider/auth/user',
    data: {
      username: username,
      password: password
    }
  })
}
