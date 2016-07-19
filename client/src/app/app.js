import React from 'react'
import {render} from 'react-dom'
import {Router, hashHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Routes from './routes'

injectTapEventPlugin()

render(
  <Router history={hashHistory}>
    {Routes}
  </Router>,
  document.getElementById('app')
)
