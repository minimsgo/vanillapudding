import Cookies from 'js-cookie'

const ACCESS_TOKEN = 'accessToken'

function login(accessToken) {
  Cookies.set(ACCESS_TOKEN, accessToken)
}

function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN)
}

function logout() {
  Cookies.remove(ACCESS_TOKEN)
}

function authenticate(nextState, replace) {
  const nextPath = nextState.location.pathname
  if (nextPath !== '/login' && !getAccessToken()) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    })
  }
}

export {
  authenticate,
  login,
  logout,
  getAccessToken,
}
