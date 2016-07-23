import React from 'react'
import {Route, Redirect} from 'react-router'

import Main from './layout/Main.jsx'
import Login from './layout/Login.jsx'
import {authenticate} from './authenticate'

import ListServices from './contents/services/List.jsx'
import CreateService from './contents/services/Create.jsx'
import ServiceDetail from './contents/services/Detail.jsx'

import ListWorks from './contents/works/List.jsx'
import CreateWork from './contents/works/Create.jsx'
import WorkDetail from './contents/works/Detail.jsx'

import ListHolders from './contents/holders/List.jsx'
import CreateHolder from './contents/holders/Create.jsx'
import HolderDetail from './contents/holders/Detail.jsx'

import ListOrders from './contents/orders/List.jsx'
import CreateOrder from './contents/orders/Create.jsx'
import OrderDetail from './contents/orders/Detail.jsx'

const Routes = (
  <Route path="/" component={Main} onEnter={authenticate} >
    <Route path="/login" component={Login}/>
    <Redirect from="services" to="/services/list"/>
    <Route path="services">
      <Route path="list" component={ListServices}/>
      <Route path="create" component={CreateService}/>
      <Route path="detail" component={ServiceDetail}/>
    </Route>
    <Redirect from="works" to="/works/list"/>
    <Route path="works">
      <Route path="list" component={ListWorks}/>
      <Route path="create" component={CreateWork}/>
      <Route path="detail" component={WorkDetail}/>
    </Route>
    <Redirect from="holders" to="/holders/list"/>
    <Route path="holders">
      <Route path="list" component={ListHolders}/>
      <Route path="create" component={CreateHolder}/>
      <Route path="detail" component={HolderDetail}/>
    </Route>
    <Redirect from="orders" to="/orders/list"/>
    <Route path="orders">
      <Route path="list" component={ListOrders}/>
      <Route path="create" component={CreateOrder}/>
      <Route path="detail" component={OrderDetail}/>
    </Route>
  </Route>
)

export default Routes
