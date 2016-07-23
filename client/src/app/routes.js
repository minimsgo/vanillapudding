import React from 'react'
import {Route, Redirect} from 'react-router'

import Main from './layout/Main.jsx'
import Login from './layout/Login.jsx'
import {authenticate} from './authenticate'

import Service from './contents/Service.jsx'

const Routes = (
  <Route path="/" component={Main} onEnter={authenticate} >
    <Route path="/login" component={Login}/>
    <Route path="/service" component={Service} />
  </Route>
)

export default Routes
