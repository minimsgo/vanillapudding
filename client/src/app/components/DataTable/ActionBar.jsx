import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui/svg-icons/action/search'

export default class ActionBar extends React.Component {

  static propTypes = {
    create: React.PropTypes.func,
    show: React.PropTypes.bool,
    detail: React.PropTypes.func,
  }

  render() {
    const style = {

      toolbar: {
        backgroundColor: 'white',
      },
      newItemButton: {
        marginRight: -24,
      },
      icon: {
        marginTop: 10,
        marginLeft: 0,
        width: 36,
        height: 36,
      },
      query: {
        field: {
          width: 120,
        },
        keyword: {
          marginTop: 0,
          marginLeft: 0,
          width: 150,
        },
      },
    }

    return (

      <Toolbar style={style.toolbar}>
        <ToolbarGroup >

        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            label="详细信息"
            disabled={!this.props.show}
            onTouchTap={this.props.detail}
          />
          <RaisedButton
            label="新建"
            primary
            onTouchTap={this.props.create}
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
