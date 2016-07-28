import React from 'react'

import {MuiThemeProvider, AppBar}from 'material-ui'

import Nav from './Nav.jsx'

class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      navOpen: false,
      title: '',
    }
  }

  componentDidMount() {
    this.setState({
      title: this.genTitle(this.props.location.pathname)
    })
  }

  handleTouchTapLeftIconButton() {
    this.setState({
      navOpen: !this.state.navOpen,
    })
  }

  handleChangeNav(open) {
    this.setState({
      navOpen: open,
    })
  }

  genTitle(pathname) {
    let title = ''
    switch (pathname) {
      case '/order':
        title = '订单管理'
        break
      case '/holder':
        title = '挂衣号'
        break
      case '/service':
        title = '服务项目'
        break
      case '/wear':
        title = '条码扫描'
        break
      default:
        break
    }
    return title
  }

  handleRoute(event, value) {

    window.location = `#${value}`
    this.setState({
      navOpen: false,
      title: this.genTitle(value)
    })
  }

  render() {
    const styles = {
      root: {
        padding: 50,
      },
      content: {
      },
    }
    const {
      children,
      location,
    } = this.props

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={this.state.title}
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton.bind(this)}
          />
          {
            location.pathname !== '/login' ?
            <div style={styles.root}>
              <div style={styles.content}>
                {children}
              </div>
            </div> : children
          }
          <Nav
            docked={false}
            open={this.state.navOpen}
            location={location}
            onRequestChange={this.handleChangeNav.bind(this)}
            onRoute={this.handleRoute.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
}

export default Main
