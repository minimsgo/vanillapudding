import React from 'react'

import {
  Paper, TextField, RaisedButton, MuiThemeProvider
} from 'material-ui'

import {cyan500} from 'material-ui/styles/colors'

import call from '../api'
import {login, logout} from '../authenticate'

class Login extends React.Component {

  reset() {
    console.log(this.refs.username)
    // this.refs.username.getDOMNode().reset()
    // this.refs.password.reset()
  }

  submit() {
    const username = this.refs.username.getValue()
    const password = this.refs.password.getValue()
    logout()
    call('Users/login', 'POST', {
        email: username,
        password: password,
      }
    ).then(res => {
      if (res.status !== 200) {
        this.reset()
      } else {
        res.json().then(json => {
          const accessToken = json.id
          login(accessToken)
          window.location = '#/'
        })
      }
    })
  }


  render() {
    const style = {
      root: {
        backgroundColor: cyan500,
        height: 638,
      },
      container: {
        maxWidth: 400,
        margin: '0 auto',
        padding: 50,
        position: 'relative',
        top: 100,
      },
      content: {
        maxWidth: 300,
        margin: '0 auto',
      }
    }

    return (
      <div style={style.root}>
        <Paper style={style.container}>
          <div style={style.content}>
            <TextField
              hintText="请输入用户名"
              floatingLabelText="用户名"
              ref="username"
            />
            <br/>
            <TextField
              hintText="请输入密码"
              floatingLabelText="密码"
              type="password"
              ref="password"
            />
            <br/>
            <br/>
            <RaisedButton
              primary
              onTouchTap={this.submit.bind(this)}
              label="登录"/>
          </div>
        </Paper>
      </div>
    )
  }
}

export default Login
