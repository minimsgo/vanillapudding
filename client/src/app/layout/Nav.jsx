import React from 'react'
import {Drawer, List, ListItem, MakeSelectable} from 'material-ui'
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const SelectableList = MakeSelectable(List)

class Nav extends React.Component {

  handleTouchTapHeader() {
    window.location = '#/'
  }

  render() {
    const {
      docked,
      open,
      onRequestChange,
      onRoute,
      location,
    } = this.props

    const styles = {
      logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan500,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8,
      },
    }

    return (
      <Drawer
        docked={docked}
        open={open}
        onRequestChange={onRequestChange}
      >

        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          VanillaPudding
        </div>

        <SelectableList
          value={location.pathname}
          onChange={onRoute}
        >
          <ListItem primaryText="订单管理" value="/order"/>
          <ListItem primaryText="服务项目" value="/service"/>
          <ListItem primaryText="挂衣号" value="/holder"/>
        </SelectableList>
      </Drawer>
    )
  }
}


Nav.propTypes = {
  docked: React.PropTypes.bool.isRequired,
  open: React.PropTypes.bool.isRequired,
  onRequestChange: React.PropTypes.func.isRequired,
  onRoute: React.PropTypes.func.isRequired,
}

export default Nav
