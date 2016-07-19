import React from 'react'

import {MuiThemeProvider, AppBar}from 'material-ui'

import Nav from './Nav.jsx'

class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      navOpen: false,
    }
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

  handleRoute(event, value) {
    window.location = `#${value}`
    this.setState({
      navOpen: false,
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
