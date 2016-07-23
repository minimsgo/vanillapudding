import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import call from '../../api'
import store from '../../store'

class WorkDetail extends React.Component {

  constructor() {
    super()
    this.state = {
      code: -1,
      state: '',
      id: -1,
    }
  }

  componentDidMount() {
    const item = store.selection
    if (item) {
      this.setState({
        code: item.code,
        state: item.state,
        id: item.id
      })
    } else {
      window.location = '/#/holders/list'
    }
  }

  submit() {
    const holder = {
      code: this.state.code,
      state: this.state.state,
    }
    call(`holders/${this.state.id}`, 'PUT', holder).then((res) => {
      if (res.status === 200) {
        window.location = '/#/holders/list'
      }
    })
  }

  deleteItem() {
    call(`holders/${this.state.id}`, 'DELETE')
      .then(res => {
        if (res.status === 200) {
          window.location = '/#/holders/list'
        }
      })
  }

  cancel() {
    window.location = '/#/holders/list'
  }


  handleCodeChange(event, value) {
    this.setState({
      code: value,
    })
  }

  handleStateChange(event, value) {
    this.setState({
      state: value,
    })
  }

  render() {
    const actionBarStyle = {
      backgroundColor: 'white',
    }
    const actionStyle = {
      marginLeft: -10,
    }

    return (
      <div>
        <div>
          <TextField
            hintText="编号"
            floatingLabelText="编号"
            onChange={::this.handleCodeChange}
            value={this.state.code}
          />
          <br />
          <TextField
            hintText="状态"
            floatingLabelText="状态"
            onChange={::this.handleStateChange}
            value={this.state.state}
          />
          <br />
        </div>
        <br />
        <Toolbar style={actionBarStyle}>
          <ToolbarGroup>
            <RaisedButton
              style={actionStyle}
              label="取消"
              onTouchTap={this.cancel}
            />
            <RaisedButton
              style={actionStyle}
              label="删除"
              secondary
              onTouchTap={::this.deleteItem}
            />
            <RaisedButton
              label="确认"
              style={actionStyle}
              onTouchTap={::this.submit}
              primary
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
export default WorkDetail;

