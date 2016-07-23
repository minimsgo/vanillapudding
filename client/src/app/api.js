import Uri from 'jsuri'

import {getAccessToken} from './authenticate'

const API_ROOT = 'http://localhost:3000/api/'
const LOGIN_END_POINT = 'Users/login'

function call(endpoint, method, body) {
  let uri = new Uri(API_ROOT + endpoint)
  if (endpoint !== LOGIN_END_POINT) {
    const accessToken = getAccessToken()
    uri.addQueryParam('access_token', accessToken)
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  let init = {
    method,
    headers,
  }
  const data = JSON.stringify(body)
  init = body ?
    Object.assign(init, { body: data }) :
    init
  const request = new Request(uri, init)
  return fetch(request)
}


export default call
