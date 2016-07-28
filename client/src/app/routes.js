import React from 'react'
import {Route, Redirect} from 'react-router'

import Main from './layout/Main.jsx'
import Login from './layout/Login.jsx'
import {authenticate} from './authenticate'

import Service from './contents/Service.jsx'
import Holder from './contents/holder/Holder.jsx'
import Order from './contents/order/Order.jsx'
import Query from './contents/wear/Query.jsx'

const Routes = (
  <Route path="/" component={Main} onEnter={authenticate} >
    <Route path="/login" component={Login}/>
    <Route path="/order" component={Order} />
    <Route path="/service" component={Service} />
    <Route path="/holder" component={Holder} />
    <Route path="/wear" component={Query} />
  </Route>
)

export default Routes
