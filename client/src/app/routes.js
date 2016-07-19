import React from 'react'
import {Route, Redirect} from 'react-router'

import Main from './layout/Main.jsx'
import Login from './layout/Login.jsx'
import {authenticate} from './authenticate'

import ListServices from './contents/services/List.jsx'
import CreateService from './contents/services/Create.jsx'
import EditService from './contents/services/Edit.jsx'

const Routes = (
  <Route path="/" component={Main} onEnter={authenticate} >
    <Route path="/login" component={Login}/>
    <Redirect from="services" to="/services/list"/>
    <Route path="services">
      <Route path="list" component={ListServices}/>
      <Route path="create" component={CreateService}/>
      <Route path="edit" component={EditService}/>
    </Route>
  </Route>
)

export default Routes
